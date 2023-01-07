import React from "react";
import RemoveIcon from "../../atoms/RemoveIcon/RemoveIcon";
import styles from "./RemoveButton.module.css";

const RemoveButton = ({ onClick, id }) => {
  return (
    <button
      type="button"
      onClick={(e) => onClick(e, id)}
      className={styles.remove}
    >
      <RemoveIcon size="6" />
    </button>
  );
};

export default RemoveButton;
