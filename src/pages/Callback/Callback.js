import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import spotifyApi from "../../services/spotify";

import Spinner from "../../components/Spinner/Spinner";

import "./Callback.css";

const Callback = () => {
  const navigate = useNavigate();

  // loading
  const [loading, setLoading] = useState(false);

  const handleOpenLoading = () => {
    setLoading(true);
  };
  const handleCloseLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // Guard Clause: Check if the token already exists
    const existingToken = spotifyApi.getSpotifyAccessToken();

    if (code && !existingToken) {
      // Set a flag in localStorage to prevent multiple executions
      if (!localStorage.getItem("isRequestingToken")) {
        localStorage.setItem("isRequestingToken", "true"); // Set the flag
        handleOpenLoading();
        spotifyApi
          .getAccessToken(code)
          .then((res) => {
            const { access_token, expires_in, refresh_token } = res;
            localStorage.setItem("spotifyAccessToken", access_token);
            localStorage.setItem("spotifyRefreshToken", refresh_token);
            localStorage.setItem(
              "spotifyTokenExpires",
              Date.now() + expires_in * 1000
            );

            // Clear the flag and navigate to "/home"
            localStorage.removeItem("isRequestingToken");
            navigate("/home");
            handleCloseLoading();
          })
          .catch((error) => {
            console.error("Error fetching access token:", error);
            // Clear the flag if there's an error
            localStorage.removeItem("isRequestingToken");
            navigate("/");
            handleCloseLoading();
          });
      }
    } else if (existingToken) {
      // If the token already exists, navigate to "/home"
      navigate("/home");
      handleCloseLoading();
    }
  }, [navigate]);

  return (
    <div className="callback-container">
      {loading && <Spinner />}
      Loading...
    </div>
  );
};

export default Callback;
