import React from "react";

import TrackList from "../Tracklist/Tracklist";
import Pagination from "../Pagination/Pagination";

import "./SearchResults.css";

const SearchResults = React.memo(
  ({
    tracks,
    pageCount,
    total,
    onPageChange,
    onAddTrack,
    className,
    ...props
  }) => {
    return (
      <div
        {...props}
        className={`card-content search-results-container ${className}`}
      >
        <h2 className="result-heading mb-3">Results {total ? total : ""}</h2>

        <TrackList className="mb-3" tracks={tracks} onAddTrack={onAddTrack} />

        {tracks.length > 0 && (
          <div className="mb-3">
            <Pagination pageCount={pageCount} onPageChange={onPageChange} />
          </div>
        )}
      </div>
    );
  }
);

export default SearchResults;
