import React from "react";

import Button from "../../common/Button/Button";

import { FaHeadphonesAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";

import "./Track.css";

const Track = React.memo(
  ({ track, onAddTrack, onRemoveTrack, className, ...props }) => {
    const handleAddTrack = () => {
      onAddTrack(track);
    };
    const handleRemoveTrack = () => {
      onRemoveTrack(track);
    };
    const handleOpenPreviewTrack = () => {
      track.action(track);
    };

    return (
      <div {...props} className={`track-container pb-2 mb-2 ${className}`}>
        <div>
          <h3 className="mb-_5">{track.name}</h3>
          <p className="track-info mb-1">
            <span className="mr-1">{track.artist}</span>
            <span className="mr-1">|</span>
            <span>{track.album}</span>
          </p>
          <Button className="preview-btn" onClick={handleOpenPreviewTrack}>
            <FaHeadphonesAlt />
            <span>PREVIEW</span>
          </Button>
        </div>

        {onAddTrack ? (
          <button className="track-action" onClick={handleAddTrack}>
            <IoMdAddCircleOutline size={25} />
          </button>
        ) : (
          <button className="track-action" onClick={handleRemoveTrack}>
            <FiMinusCircle size={23} />
          </button>
        )}
      </div>
    );
  }
);

export default Track;
