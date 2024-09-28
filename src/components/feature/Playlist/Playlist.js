import React from "react";

import Tracklist from "../Tracklist/Tracklist";
import Button from "../../common/Button/Button";

import "./Playlist.css";

const Playlist = React.memo(
  ({
    tracks,
    playlistName,
    onChangePlaylistName,
    onRemoveTrack,
    onCreatePlaylist,
    className,
    ...props
  }) => {
    return (
      <div
        {...props}
        className={`card-content playlist-container ${className}`}
      >
        <input
          className="mb-3"
          value={playlistName}
          onChange={onChangePlaylistName}
          placeholder="New Playlist"
        />

        <Tracklist
          className="mb-3"
          tracks={tracks}
          onRemoveTrack={onRemoveTrack}
        />

        <Button className="save-btn" onClick={onCreatePlaylist}>
          SAVE TO SPOTIFY
        </Button>
      </div>
    );
  }
);

export default Playlist;
