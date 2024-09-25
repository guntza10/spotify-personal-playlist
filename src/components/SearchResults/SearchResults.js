import React from "react";

import TrackList from "../Tracklist/Tracklist";

import "./SearchResults.css";

const SearchResults = React.memo(({ tracks, className, ...props }) => {
  return (
    <div
      {...props}
      className={`card-content search-results-container ${className}`}
    >
      <h2 className="result-heading">Results</h2>

      <TrackList tracks={tracks} />
    </div>
  );
});

export default SearchResults;
