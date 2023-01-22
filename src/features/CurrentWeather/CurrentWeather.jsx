import React, { useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import getLocationByIPService from "../../services/getLocationByIPService";
import getCurrentWeatherService from "../../services/getWeatherByCoordinatesService";
import { capitalize, getTimeFromTimestamp } from "../../utils/utils";
import CurrentWeatherModule from "./components/CurrentWeatherModule/CurrentWeatherModule";

function CurrentWeather({
  setLocation,
  location,
  weatherData,
  setWeatherData,
  onClick,
  isSaved,
  settings,
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
        const {
          temp: temperature,
          feels_like: feelsLike,
          humidity,
        } = data.main;
        const { sunset, sunrise } = data.sys;
        const { icon, description } = data.weather[0];
        const capitalizedDescription = capitalize(description);
        const wind = Math.round(data.wind.speed);

        setWeatherData({
          temperature: Math.round(temperature),
          description: capitalizedDescription,
          icon,
          wind: `${wind} m/s`,
          feelsLike: `${Math.round(feelsLike)}°`,
          sunset: getTimeFromTimestamp(sunset),
          sunrise: getTimeFromTimestamp(sunrise),
          humidity: `${humidity}%`,
        });
      })
      .catch((e) => e);
  }, [location]);

  return (
    <div>
      {weatherData.temperature === null || location.city === "" ? (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#fff"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible
        />
      ) : (
        <CurrentWeatherModule
          onClick={onClick}
          isSaved={isSaved}
          settings={settings}
          weatherData={weatherData}
          location={location}
        />
      )}
    </div>
  );
}

export default CurrentWeather;
