import React from "react";

import ReactModal from "react-modal";

const modalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "24px",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(var(--base-black-rgb),0.4)",
  },
};

const Modal = React.memo(
  ({ isOpen, onClose, children, contentLabel, ...props }) => {
    return (
      <ReactModal
        {...props}
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel={contentLabel ? contentLabel : "Modal"}
        style={modalStyles}
      >
        {children}
      </ReactModal>
    );
  }
);

export default Modal;
