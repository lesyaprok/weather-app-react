import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";

const Settings = ({ settings, onChange }) => {
  const navigate = useNavigate();
  const redirect = () => navigate("/");
  const { optional, blocks } = settings;

  return (
    <div className={styles.settings}>
      <h2 className={styles.title}>Settings</h2>
      <div className={styles.wrapper}>
        <div className={styles.optional}>
          {optional.map((set) => (
            <div key={set.id} className="flex items-center gap-1">
              <input
                className={styles.checkbox}
                type="checkbox"
                value={set.value}
                name={set.value}
                id={set.id}
                checked={set.isChecked}
                onChange={(e) => onChange(e, set.id)}
              />
              <label className="ml-2 text-lg cursor-pointer" htmlFor={set.id}>
                {set.value === "feelsLike" ? "feels like" : set.value}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.blocks}>
          {blocks.map((set) => (
            <div key={set.id} className="flex items-center gap-1">
              <input
                className={styles.checkbox}
                type="checkbox"
                value={set.value}
                name={set.value}
                id={set.id}
                checked={set.isChecked}
                onChange={(e) => onChange(e, set.id)}
              />
              <label className="ml-2 text-lg cursor-pointer" htmlFor={set.id}>
                {set.value}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button type="submit" className={styles.button} onClick={redirect}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;
