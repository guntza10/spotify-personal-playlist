import React from "react";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import { MdCancel } from "react-icons/md";

import "./FailDialog.css";

const FailDialog = React.memo(({ isOpen, message, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentLabel="Fail Dialog">
      <div className="dialog">
        <div className="dialog-icon mb-1">
          <MdCancel size={35} className="fail-icon" />
        </div>
        <h2 className="mb-1">{message.heading}</h2>
        <p className="mb-3">{message.description}</p>
        <Button className="close-btn" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
});

export default FailDialog;
