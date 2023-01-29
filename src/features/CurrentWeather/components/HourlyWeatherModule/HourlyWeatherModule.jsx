import React from "react";
import WEATHER_ICONS from "../WeatherIcons/WeatherIcons";
import styles from "./HourlyWeather.module.css";

const HourlyWeatherModule = ({ hourlyWeatherData }) => {
  return (
    <ul className={`${styles.hourlyModule}`}>
      {hourlyWeatherData.map((item) => {
        return (
          <li key={item.id} className={styles.item}>
            <p className="font-bold">{item.date}</p>
            <div>{WEATHER_ICONS[item.icon]}</div>
            <p className="text-lg">{item.temp}°</p>
          </li>
        );
      })}
    </ul>
  );
};

export default HourlyWeatherModule;
