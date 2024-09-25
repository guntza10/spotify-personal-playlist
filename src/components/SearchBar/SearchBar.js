import React from "react";

import "./SearchBar.css";

const SearchBar = React.memo(() => {
  return (
    <div className="search-bar-container">
      <input />
    
      <button className="button search-button">SEARCH</button>
    </div>
  );
});

export default SearchBar;
