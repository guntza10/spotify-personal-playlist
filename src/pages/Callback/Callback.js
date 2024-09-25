import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import spotifyApi from "../../services/spotify";

import "./Callback.css";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const existingToken = spotifyApi.getSpotifyAccessToken();
    
    if (code && !existingToken) {
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
          navigate("/home");
        })
        .catch(() => {
          navigate("/");
        });
    }
  }, [navigate]);

  return <div className="callback-container">Loading...</div>;
};

export default Callback;
