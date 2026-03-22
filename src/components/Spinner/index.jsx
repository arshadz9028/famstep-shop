// components/Spinner.js
import React from "react";

const Spinner = ({ size = 40, thickness = 4 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid #e5e7eb`,
        borderTop: `${thickness}px solid #25a195`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
};

export default Spinner;