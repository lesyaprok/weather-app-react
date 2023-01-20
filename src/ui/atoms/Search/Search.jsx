import React from "react";
import styles from "./Search.module.css";

const Search = ({ value, placeholder, onChange }) => {
  return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.search}
      />
  );
};

export default Search;
