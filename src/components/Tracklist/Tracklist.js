import React from "react";

import Track from "../Track/Track";

const Tracklist = React.memo(({ tracks, className, ...props }) => {
  return (
    <div {...props} className={className}>
      {tracks.map((track) => (
        <Track track={track} />
      ))}
    </div>
  );
});

export default Tracklist;
