import React from "react";

const Settings = ({ settings, onChange }) => {
  return (
    <div className="settings">
      <h2 className="text-center mb-5 font-bold text-xl">Settings</h2>
      <div className="flex flex-col">
        {settings.map((set) => (
          <div key={set.id} className="flex items-center">
            <input
              className=""
              type="checkbox"
              value={set.value}
              name={set.value}
              id={set.id}
              checked={set.isChecked}
              onChange={(e) => onChange(e, set.id)}
            />
            <label className="ml-2 text-lg" htmlFor={set.value}>
              {set.value === "feelsLike" ? "feels like" : set.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
