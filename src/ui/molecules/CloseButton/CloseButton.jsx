import React from "react";
import RemoveIcon from "../../atoms/RemoveIcon/RemoveIcon";

const CloseButton = ({ onClick }) => {
  return (
    <button type="button" className="absolute" onClick={onClick}>
      <RemoveIcon size="8" />
    </button>
  );
};

export default CloseButton;
