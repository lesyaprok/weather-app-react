import React, { useState } from "react";
import "./App.css";
import Header from "./ui/organisms/Header/Header";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import getWeatherByNameService from "./services/getWeatherByNameService";
import { getCountryByCode } from "./utils/utils";

function App() {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    city: "",
    country: "",
  });
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    description: "",
    icon: "",
  });
  const [cityName, setCityName] = useState("");
  const getWeatherForCity = () => {
    if (!cityName.trim()) return;
    getWeatherByNameService(cityName)
      .then((data) => {
        const { lat, lon } = data.coord;
        const country = getCountryByCode(data.sys.country);
        const city = data.name;
        setLocation({ city, country, lat, lon });
      })
      .catch((e) => e)
      .finally(() => setCityName(""));
  };

  return (
    <div className="app font-nunito bg-slate-800 min-h-screen flex justify-center items-center">
      <Header
        onChange={(e) => setCityName(e.target.value)}
        onClick={getWeatherForCity}
        onKeyDown={(e) => (e.keyCode === 13 ? getWeatherForCity() : null)}
        cityName={cityName}
      />
      <CurrentWeather
        location={location}
        setLocation={setLocation}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
    </div>
  );
}

export default App;
