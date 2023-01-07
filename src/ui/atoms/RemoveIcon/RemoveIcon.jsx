import React from "react";

const RemoveIcon = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="#cbd5e1"
      className={`w-${size} h-${size} stroke-slate-300 hover:stroke-slate-100 transition-all duration-300`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default RemoveIcon;
