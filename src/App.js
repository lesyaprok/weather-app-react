import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./ui/organisms/Header/Header";
import CurrentWeather from "./features/CurrentWeather/CurrentWeather";
import getWeatherByNameService from "./services/getWeatherByNameService";
import { getCountryByCode } from "./utils/utils";
import SavedCities from "./features/SavedCities/SavedCities";
import Settings from "./features/Settings/Settings";
import {
  INITIAL_LOCATION_OBJECT,
  INITIAL_WEATHER_OBJECT,
  SETTINGS,
} from "./constants";

const getDataFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

function App() {
  const citiesFromLocalStorage = getDataFromStorage("savedCities");
  const settingsFromLocalStorage = getDataFromStorage("settings");

  const [location, setLocation] = useState(INITIAL_LOCATION_OBJECT);
  const [weatherData, setWeatherData] = useState(INITIAL_WEATHER_OBJECT);
  const [cityName, setCityName] = useState("");
  const [savedCities, setSavedCities] = useState(citiesFromLocalStorage || []);
  const [settings, setSettings] = useState(
    settingsFromLocalStorage || SETTINGS
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setStorageData("savedCities", savedCities);
  }, [savedCities]);

  useEffect(() => {
    setStorageData("settings", settings);
  }, [settings]);

  const setOptions = (e, id) => {
    setSettings((prevState) =>
      prevState.map((set) =>
        set.id === id ? { ...set, isChecked: e.target.checked } : set
      )
    );
  };

  const isCitySaved = () => {
    return savedCities.find(
      (city) => city.name === location.city && city.country === location.country
    );
  };

  const addCityToSaved = () => {
    const id = savedCities.length
      ? savedCities[savedCities.length - 1].id + 1
      : 1;
    const { city: name, country, lat, lon } = location;
    const savedCity = isCitySaved();
    if (savedCity) {
      const filteredCities = savedCities.filter(
        (city) => city.id !== savedCity.id
      );
      setSavedCities(filteredCities);
    } else {
      setSavedCities([...savedCities, { id, name, country, lat, lon }]);
    }
  };

  const removeCityFromSaved = (e, cityId) => {
    e.stopPropagation();
    setSavedCities(savedCities.filter((city) => city.id !== cityId));
  };

  const changeLocation = (lat, lon, city, country) => {
    setLocation({ lat, lon, city, country });
  };

  const getWeatherForCity = () => {
    if (!cityName.trim()) return;
    getWeatherByNameService(cityName)
      .then((data) => {
        const { lat, lon } = data.coord;
        const country = getCountryByCode(data.sys.country);
        const city = data.name;
        changeLocation(lat, lon, city, country);
      })
      .catch((e) => e)
      .finally(() => setCityName(""));
  };

  const searchCity = (e) => (e.keyCode === 13 ? getWeatherForCity() : null);

  return (
    <Router>
      <div className="app font-nunito min-h-screen flex justify-center items-center overflow-hidden">
        <Header
          onChange={(e) => setCityName(e.target.value)}
          onClick={getWeatherForCity}
          onKeyDown={searchCity}
          cityName={cityName}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Routes>
          <Route
            path="/"
            element={
              <CurrentWeather
                location={location}
                setLocation={setLocation}
                weatherData={weatherData}
                setWeatherData={setWeatherData}
                onClick={addCityToSaved}
                isSaved={isCitySaved}
                settings={settings}
              />
            }
          />
          <Route
            path="/settings"
            element={<Settings settings={settings} onChange={setOptions} />}
          />
        </Routes>

        <SavedCities
          isSidebarOpen={isSidebarOpen}
          savedCities={savedCities}
          setSavedCities={setSavedCities}
          removeCityFromSaved={removeCityFromSaved}
          changeLocation={changeLocation}
          closeSidebar={() => setIsSidebarOpen((prevState) => !prevState)}
        />
      </div>
    </Router>
  );
}

export default App;
