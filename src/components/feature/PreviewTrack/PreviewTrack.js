import React from "react";

import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";

import "./PreviewTrack.css";

const PreviewTrack = React.memo(({ track, isOpen, onClose }) => {
  const handleOpenFullSong = () => {
    const {
      external_urls: { spotify: url },
    } = track;
    window.open(url, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentLabel="Preview track">
      <div className="preview-track-container">
        <h2 className="mb-1">{track.name}</h2>
        <p className="track-info mb-3">
          <span className="mr-1">{track.artist}</span>
          <span className="mr-1">|</span>
          <span>{track.album}</span>
        </p>

        {track.preview_url ? (
          <div>
            <audio className="mb-3" controls autoPlay loop>
              <source src={track.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : (
          <div className="mb-3 there-is-no-preview-url">
            Sorry, There is no preview url from spotify.
          </div>
        )}

        <Button
          className="mb-2 listen-full-song-btn"
          onClick={handleOpenFullSong}
        >
          Listen Full Song
        </Button>
        <Button className="close-btn" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
});

export default PreviewTrack;
