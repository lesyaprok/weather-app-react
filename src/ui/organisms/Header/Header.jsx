import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "../../atoms/HomeIcon/HomeIcon";
import SavedIcon from "../../atoms/SavedIcon/SavedIcon";
import SettingsIcon from "../../atoms/SettingsIcon/SettingsIcon";
import SearchForm from "../../molecules/SearchForm/SearchForm";
import styles from "./Header.module.css";

const Header = ({
  onChange,
  onClick,
  onKeyDown,
  cityName,
  setIsSidebarOpen,
  isFound
}) => {
  return (
    <header className={styles.header}>
      <div className="flex flex-col-reverse gap-4 sm:flex-row items-center justify-between sm:gap-2 lg:gap-4">
        <SearchForm
          onChange={onChange}
          onClick={onClick}
          onKeyDown={onKeyDown}
          cityName={cityName}
          isFound={isFound}
        />
        <div className="flex gap-6">
          <NavLink to="/">
            <HomeIcon />
          </NavLink>
          <SavedIcon setIsSidebarOpen={setIsSidebarOpen} />
          <NavLink to="/settings">
            <SettingsIcon />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
