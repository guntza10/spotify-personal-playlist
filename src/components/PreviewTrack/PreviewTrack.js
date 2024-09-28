import React from "react";

import Button from "../common/Button/Button";
import Modal from "../common/Modal/Modal";

import "./PreviewTrack.css";

const PreviewTrack = React.memo(({ track, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentLabel="Preview track">
      <div className="preview-track-container">
        <h2 className="mb-1">{track.name}</h2>
        <p className="track-info mb-3">
          <span className="mr-1">{track.artist}</span>
          <span className="mr-1">|</span>
          <span>{track.album}</span>
        </p>

        <audio className="mb-3" controls autoPlay loop>
          <source src={track.preview_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <Button className="close-btn" onClick={onClose}>
          CLOSE
        </Button>
      </div>
    </Modal>
  );
});

export default PreviewTrack;
