import React from "react";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";

function App() {
  return (
    <div className="app font-nunito bg-slate-800 min-h-screen flex justify-center items-center">
      <CurrentWeather />
    </div>
  );
}

export default App;
