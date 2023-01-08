import React from "react";
import RemoveIcon from "../../atoms/RemoveIcon/RemoveIcon";

const CloseButton = ({ onClick }) => {
  return (
    <button type="button" className="absolute" onClick={onClick}>
      <RemoveIcon size="10" />
    </button>
  );
};

export default CloseButton;
