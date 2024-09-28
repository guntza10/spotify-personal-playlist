import React from "react";

import "./Spinner.css";

const Spinner = React.memo(() => {
  return (
    <div className="backdrop">
      <div className="spinner"></div>
    </div>
  );
});

export default Spinner;
