import React from "react";
import SavedIcon from "../../atoms/SavedIcon/SavedIcon";
import SearchForm from "../../molecules/SearchForm/SearchForm";
import styles from "./Header.module.css";

const Header = ({
  onChange,
  onClick,
  onKeyDown,
  cityName,
  setIsSidebarOpen,
}) => {
  return (
    <header className={styles.header}>
      <div className="flex items-center justify-between gap-10">
        <SearchForm
          onChange={onChange}
          onClick={onClick}
          onKeyDown={onKeyDown}
          cityName={cityName}
        />
        <SavedIcon setIsSidebarOpen={setIsSidebarOpen} />
      </div>
    </header>
  );
};

export default Header;
