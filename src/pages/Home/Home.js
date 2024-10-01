import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import spotifyApi from "../../services/spotify";

import Header from "../../layouts/Header/Header";
import Main from "../../layouts/Main/Main";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = spotifyApi.getSpotifyAccessToken();
    if (!token) navigate("/");
  }, [navigate]);

  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};

export default Home;
