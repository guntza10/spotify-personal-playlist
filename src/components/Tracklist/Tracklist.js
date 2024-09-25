import React from "react";
import Track from "../Track/Track";

const Tracklist = React.memo(({ tracks }) => {
  return (
    <div className="track-list">
      {tracks.map((track) => (
        <Track track={track} />
      ))}
    </div>
  );
});

export default Tracklist;
