import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${className} ${styles.button}`}
    >
      {children}
    </button>
  );
};

export default Button;
