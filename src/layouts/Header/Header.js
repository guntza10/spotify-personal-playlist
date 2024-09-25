import React from "react";

import "./Header.css";

const Header = React.memo(() => {
  return (
    <header>
      <h1>
        Ja<span className="highlight-text">mmm</span>ing
      </h1>
    </header>
  );
});

export default Header;
