import React, { useEffect } from "react";

import { loginToSpotify } from "../../services/auth";

import Header from "../../layouts/Header/Header";

import "./Login.css";

const Login = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="login-container">
      <Header />
      <div className="login-content">
        <h1 className="mb-3">Login to Spotify</h1>
        <button className="button" onClick={loginToSpotify}>
          Login with Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;
