import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import getLocationByIPService from "../../services/getLocationByIPService";
import getWeatherByCoordinatesService from "../../services/getWeatherByCoordinatesService";
import {
  capitalize,
  getTimeFromTimestamp,
  getDateFromTimestamp,
  setTemperatureSign,
} from "../../utils/utils";
import CurrentWeatherModule from "./components/CurrentWeatherModule/CurrentWeatherModule";
import getDailyForecastService from "../../services/getDailyForecastService";
import HourlyWeatherModule from "./components/HourlyWeatherModule/HourlyWeatherModule";
import WeekWeatherModule from "./components/WeekWeatherModule/WeekWeatherModule";

const getInitialLocation = getLocationByIPService().then((data) => data);

function CurrentWeather({
  setLocation,
  location,
  weatherData,
  setWeatherData,
  onClick,
  isSaved,
  settings,
}) {
  const [weekWeather, setWeekWeather] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (location.lon !== null && location.lat !== null) return;
    getInitialLocation
      .then((data) => {
        const {
          latitude: lat,
          longitude: lon,
          city,
          country_name: country,
        } = data;
        setLocation({ lat, lon, city, country });
      })
      .catch((e) => e);
  }, []);

  useEffect(() => {
    setIsLoad(true);
    const { lat, lon } = location;
    if (lat === null || lon === null) return;
    getWeatherByCoordinatesService(lat, lon)
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
        const { timezone } = data;

        setWeatherData({
          temperature: Math.round(temperature),
          description: capitalizedDescription,
          icon,
          wind: `${wind} m/s`,
          feelsLike: `${Math.round(feelsLike)}??`,
          sunset: getTimeFromTimestamp(sunset, timezone),
          sunrise: getTimeFromTimestamp(sunrise, timezone),
          humidity: `${humidity}%`,
        });
      })
      .catch((e) => e)
      .finally(() => setIsLoad(false));
  }, [location.lat, location.lon]);

  useEffect(() => {
    const { lat, lon } = location;
    if (lat === null || lon === null) return;

    getDailyForecastService(lat, lon)
      .then((data) => {
        const timezone = data.city?.timezone;
        const filteredData = data.list.filter((day, i) => {
          const [hours] = getTimeFromTimestamp(day.dt, timezone)
            .split(":")
            .map((e) => +e);
          if (i === 0 && hours >= 15) return day;
          return hours >= 15 && hours < 18;
        });

        const weekDataToSet = filteredData.map((day, i) => {
          const { icon, description } = day.weather[0];
          return {
            id: i + 1,
            date: getDateFromTimestamp(day.dt),
            temp: setTemperatureSign(day.main.temp),
            icon,
            description,
          };
        });

        const hourlyDataToSet = data.list.slice(0, 9).map((day, i) => {
          const timestamp = day.dt;
          const { icon } = day.weather[0];
          return {
            id: i + 1,
            date: getTimeFromTimestamp(timestamp, timezone),
            temp: setTemperatureSign(day.main.temp),
            icon,
          };
        });

        setHourlyData(hourlyDataToSet);
        setWeekWeather(weekDataToSet);
      })
      .catch((e) => e);
  }, [location.lat, location.lon]);

  return (
    <div>
      {isLoad ? (
        <TailSpin
          height={160}
          width={160}
          color="white"
          radius={1}
          ariaLabel="tail-spin-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible
        />
      ) : (
        <div className="mt-36 sm:mt-28 flex flex-col gap-6">
          <CurrentWeatherModule
            onClick={onClick}
            isSaved={isSaved}
            settings={settings.optional}
            weatherData={weatherData}
            location={location}
          />
          <HourlyWeatherModule
            hourlyWeatherData={hourlyData}
            settings={settings.blocks[1]}
          />
          <WeekWeatherModule
            weekWeatherData={weekWeather}
            settings={settings.blocks[0]}
          />
        </div>
      )}
    </div>
  );
}
export default CurrentWeather;
