import React from "react";

import "./Track.css";

const Track = React.memo(
  ({ track, onAddTrack, onRemoveTrack, className, ...props }) => {
    const handleAddTrack = () => {
      onAddTrack(track);
    };
    const handleRemoveTrack = () => {
      onRemoveTrack(track);
    };

    return (
      <div {...props} className={`track-container pb-2 mb-2 ${className}`}>
        <div className="track-information">
          <h3 className="mb-_5">{track.name}</h3>
          <p className="track-info">
            <span className="mr-1">{track.artist}</span>
            <span className="mr-1">|</span>
            <span>{track.album}</span>
          </p>
        </div>

        {onAddTrack ? (
          <button className="track-action" onClick={handleAddTrack}>
            +
          </button>
        ) : (
          <button className="track-action" onClick={handleRemoveTrack}>
            -
          </button>
        )}
      </div>
    );
  }
);

export default Track;
