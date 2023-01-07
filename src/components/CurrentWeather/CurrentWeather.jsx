import React, { useEffect } from "react";
import WEATHER_ICONS from "../WeatherIcons/WeatherIcons";
import getLocationByIPService from "../../services/getLocationByIPService";
import getCurrentWeatherService from "../../services/getWeatherByCoordinatesService";
import { capitalize, setTempteratureSign } from "../../utils/utils";
import styles from "./CurrentWeather.module.css";
import NotSavedIcon from "../../ui/atoms/SavedIcon/NotSavedIcon";

function CurrentWeather({
  setLocation,
  location,
  weatherData,
  setWeatherData,
  onClick,
  isSaved,
}) {
  useEffect(() => {
    getLocationByIPService()
      .then((data) => {
        const { lat, lon, city, country } = data;
        setLocation({ lat, lon, city, country });
      })
      .catch((e) => e);
  }, []);

  useEffect(() => {
    const { lat, lon } = location;
    if (lat === null || lon === null) return;
    getCurrentWeatherService(lat, lon)
      .then((data) => {
        const temperature = data.main.temp;
        const { icon, description } = data.weather[0];
        const capitalizedDescription = capitalize(description);
        setWeatherData({
          temperature,
          description: capitalizedDescription,
          icon,
        });
      })
      .catch((e) => e);
  }, [location]);

  return (
    <div>
      {weatherData.temperature === null || location.city === "" ? (
        "Loading data..."
      ) : (
        <div className={styles.currentWeather}>
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={onClick}
          >
            <NotSavedIcon isSaved={isSaved} />
          </button>
          <p className={styles.location}>
            {location.city}, {location.country}
          </p>
          <div className={styles.weatherBlock}>
            <span className={styles.temperature}>
              {setTempteratureSign(weatherData.temperature)}°
            </span>
            {WEATHER_ICONS[weatherData.icon]}
          </div>
          <p className={styles.description}>{weatherData.description}</p>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
