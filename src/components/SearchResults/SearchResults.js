import React from "react";

import TrackList from "../Tracklist/Tracklist";

import "./SearchResults.css";

const SearchResults = React.memo(({ results }) => {
  return (
    <div className="search-results-container card-content">
      <h2 className="result-heading">Results</h2>

      <TrackList tracks={results} />
    </div>
  );
});

export default SearchResults;
