import React from "react";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import { FaCircleCheck } from "react-icons/fa6";

import "./SuccessDialog.css";

const SuccessDialog = React.memo(({ isOpen, message, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentLabel="Success Dialog">
      <div className="dialog">
        <div className="dialog-icon mb-1">
          <FaCircleCheck size={35} className="icon" />
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

export default SuccessDialog;
