import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./ui/organisms/Header/Header";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import getWeatherByNameService from "./services/getWeatherByNameService";
import { getCountryByCode } from "./utils/utils";
import SavedCities from "./components/SavedCities/SavedCities";
import Settings from "./components/Settings/Settings";

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
    wind: "",
    humidity: "",
    sunset: "",
    sunrise: "",
  });

  const [cityName, setCityName] = useState("");

  const [savedCities, setSavedCities] = useState([]);

  const settings = ["feelsLike", "humidity", "sunrise", "sunset", "wind"];

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
        (city) =>
          city.name !== savedCity.name && city.country !== savedCity.country
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app font-nunito min-h-screen flex justify-center items-center">
        <Header
          onChange={(e) => setCityName(e.target.value)}
          onClick={getWeatherForCity}
          onKeyDown={(e) => (e.keyCode === 13 ? getWeatherForCity() : null)}
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
          <Route path="/settings" element={<Settings settings={settings} />} />
        </Routes>

        <SavedCities
          isSidebarOpen={isSidebarOpen}
          savedCities={savedCities}
          removeCityFromSaved={removeCityFromSaved}
          changeLocation={changeLocation}
          closeSidebar={() => setIsSidebarOpen((prevState) => !prevState)}
        />
      </div>
    </Router>
  );
}

export default App;
