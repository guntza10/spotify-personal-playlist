import React from "react";

import "./Track.css";

const Track = React.memo(({ track, className, ...props }) => {
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

      <button className="track-action">+</button>
    </div>
  );
});

export default Track;
