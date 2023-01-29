import React from "react";
import WEATHER_ICONS from "../WeatherIcons/WeatherIcons";
import styles from "./WeekWeather.module.css";

const WeekWeatherModule = ({ weekWeatherData }) => {
  const getTemp = (temp) => {
    const rounded = Math.round(temp);
    return rounded > 0 ? `+${rounded}` : temp;
  };
  return (
    <>
      <h3 className={styles.title}>5-day weather forecast</h3>
      <ul className={`${styles.weekModule}`}>
        {weekWeatherData.map((day) => {
          return (
            <li key={day.id} className={styles.item}>
              <p className="text-center font-bold">{day.date}</p>
              <div className="flex flex-row items-center">
                {WEATHER_ICONS[day.icon]}
                <span className="text-lg font-semibold">
                  {getTemp(day.temp)}°
                </span>
              </div>
              <p>{day.description}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default WeekWeatherModule;
