import React from "react";

const Button = React.memo(({ className, children, ...props }) => {
  return (
    <button {...props} className={`button ${className}`}>
      {children}
    </button>
  );
});

export default Button;
