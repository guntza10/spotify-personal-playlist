import React from "react";

import "./SearchBar.css";

const SearchBar = React.memo(({ className, ...props }) => {
  return (
    <div {...props} className={`search-bar-container ${className}`}>
      <input />

      <button className="button search-button">SEARCH</button>
    </div>
  );
});

export default SearchBar;
