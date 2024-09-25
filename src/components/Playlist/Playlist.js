import React from "react";

import Tracklist from "../Tracklist/Tracklist";

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

        <button className="button save-btn" onClick={onCreatePlaylist}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
);

export default Playlist;
