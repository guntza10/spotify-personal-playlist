import React from "react";

import "./SearchBar.css";

const SearchBar = React.memo(
  ({ search, onChange, onSearch, className, ...props }) => {
    return (
      <div {...props} className={`search-bar-container ${className}`}>
        <form onSubmit={onSearch}>
          <input value={search} onChange={onChange} />

          <button className="button search-button" type="submit">
            SEARCH
          </button>
        </form>
      </div>
    );
  }
);

export default SearchBar;
