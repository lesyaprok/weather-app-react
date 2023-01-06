import React from "react";
import styles from "./Input.module.css";

const Input = ({ onChange, onKeyDown, cityName }) => {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Find a city..."
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={cityName}
    />
  );
};

export default Input;
