import React from "react";
import SearchForm from "../../molecules/SearchForm/SearchForm";
import styles from "./Header.module.css";

const Header = ({ onChange, onClick, onKeyDown, cityName }) => {
  return (
    <header className={styles.header}>
      <SearchForm
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        cityName={cityName}
      />
    </header>
  );
};

export default Header;
