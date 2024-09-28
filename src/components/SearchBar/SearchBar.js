import React from "react";

import Button from "../common/Button/Button";

import "./SearchBar.css";

const SearchBar = React.memo(
  ({ search, onChange, onSearch, className, ...props }) => {
    return (
      <div {...props} className={`search-bar-container ${className}`}>
        <form onSubmit={onSearch}>
          <input value={search} onChange={onChange} />
          <Button className="search-button" type="submit">
            SEARCH
          </Button>
        </form>
      </div>
    );
  }
);

export default SearchBar;
