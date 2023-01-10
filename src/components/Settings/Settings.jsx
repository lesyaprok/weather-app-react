import React from "react";

const Settings = ({ settings }) => {
  return (
    <div className="settings">
      <h2 className="text-center mb-5 font-bold text-xl">Settings</h2>
      <div className="flex flex-col">
        {settings.map((set) => (
          <div key={set} className="flex items-center">
            <input
              className=""
              type="checkbox"
              value={set}
              name={set}
              id={set}
            />
            <label className="ml-2 text-lg" htmlFor={set}>
              {set}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
