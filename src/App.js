import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Callback from "./pages/Callback/Callback";

import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
};

export default App;
