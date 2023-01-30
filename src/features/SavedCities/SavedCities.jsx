import React, { useState, useEffect, useRef } from "react";
import styles from "./SavedCities.module.css";
import CloseButton from "../../ui/molecules/CloseButton/CloseButton";
import RemoveButton from "../../ui/molecules/RemoveButton/RemoveButton";
import SearchInSaved from "./components/SearchInSaved/SearchInSaved";

const SavedCities = ({
  savedCities,
  removeCityFromSaved,
  changeLocation,
  isSidebarOpen,
  setSidebar,
}) => {
  const [saved, setSaved] = useState([]);
  const nodeRef = useRef(null);
  const handleClick = (e) => {
    if (!nodeRef.current.contains(e.target)) setSidebar(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const list = (
    <ul className={styles.list}>
      {saved.map((city) => {
        const { id, lat, lon, name, country } = city;
        return (
          <li
            key={id}
            className={styles.item}
            onClick={() => changeLocation(lat, lon, name, country)}
          >
            {name}, {country}
            <RemoveButton onClick={removeCityFromSaved} id={id} />
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      ref={nodeRef}
      className={`${styles.sidebar} ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      } `}
    >
      <CloseButton onClick={() => setSidebar(false)} />
      <h2 className={styles.title}>Favorites</h2>
      <SearchInSaved setSaved={setSaved} savedCities={savedCities} />
      {savedCities.length ? (
        list
      ) : (
        <p className={styles.empty}>List is empty</p>
      )}
    </aside>
  );
};

export default SavedCities;
