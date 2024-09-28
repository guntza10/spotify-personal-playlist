import React from "react";

import Track from "../Track/Track";

const Tracklist = React.memo(
  ({ tracks, className, onAddTrack, onRemoveTrack, ...props }) => {
    return (
      <div {...props} className={className}>
        {tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            onAddTrack={onAddTrack}
            onRemoveTrack={onRemoveTrack}
          />
        ))}
      </div>
    );
  }
);

export default Tracklist;
