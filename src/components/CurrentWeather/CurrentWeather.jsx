import React, { useState, useEffect } from "react";
import WEATHER_ICONS from "../WeatherIcons/WeatherIcons";
import getLocationByIPService from "../../services/getLocationByIPService";
import getCurrentWeatherService from "../../services/getCurrentWeatherService";
import { capitalize, setTempteratureSign } from "../../utils/utils";
import styles from "./CurrentWeather.module.css";

function CurrentWeather() {
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

  useEffect(() => {
    getLocationByIPService().then((data) => {
      const { lat, lon, city, country } = data;
      setLocation({ lat, lon, city, country });
    });
  }, []);

  useEffect(() => {
    const { lat, lon } = location;
    if (lat === null || lon === null) return;
    getCurrentWeatherService(lat, lon).then((data) => {
      const temperature = data.main.temp;
      const { icon, description } = data.weather[0];
      const capitalizedDescription = capitalize(description);
      setWeatherData({
        temperature,
        description: capitalizedDescription,
        icon,
      });
    });
  }, [location]);

  return (
    <div>
      {weatherData.temperature === null || location.city === "" ? (
        "Loading data..."
      ) : (
        <div className={styles.currentWeather}>
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
