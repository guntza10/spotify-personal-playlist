import React from "react";

import { formattedStringNumberWithComma } from "../../utils/common";

import TrackList from "../Tracklist/Tracklist";
import Pagination from "../common/Pagination/Pagination";

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
        <h2 className="result-heading mb-3">
          Results {total ? formattedStringNumberWithComma(total) : ""}
        </h2>

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
