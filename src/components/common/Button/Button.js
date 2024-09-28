import React from "react";

import "./Button.css";

const Button = React.memo(({ className, children, ...props }) => {
  return (
    <button {...props} className={`button ${className}`}>
      {children}
    </button>
  );
});

export default Button;
