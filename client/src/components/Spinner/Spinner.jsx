// src/components/Spinner/Spinner.jsx
import React from "react";
import "./Spinner.css"; // Create this CSS file for styling

const Spinner = () => {
  return (
    <div className="spinner mt-3 md:mt-32">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default Spinner;
