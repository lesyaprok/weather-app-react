import React, { useState } from "react";
import "./App.css";
import Header from "./ui/organisms/Header/Header";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import getWeatherByNameService from "./services/getWeatherByNameService";
import { getCountryByCode } from "./utils/utils";
import SavedCities from "./components/SavedCities/SavedCities";

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

  const [savedCities, setSavedCities] = useState([]);

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
    <div className="app font-nunito bg-slate-800 min-h-screen flex justify-center items-center">
      <Header
        onChange={(e) => setCityName(e.target.value)}
        onClick={getWeatherForCity}
        onKeyDown={(e) => (e.keyCode === 13 ? getWeatherForCity() : null)}
        cityName={cityName}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <CurrentWeather
        location={location}
        setLocation={setLocation}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        onClick={addCityToSaved}
        isSaved={isCitySaved}
      />
      <SavedCities
        isSidebarOpen={isSidebarOpen}
        savedCities={savedCities}
        removeCityFromSaved={removeCityFromSaved}
        changeLocation={changeLocation}
        closeSidebar={() => setIsSidebarOpen((prevState) => !prevState)}
      />
    </div>
  );
}

export default App;
