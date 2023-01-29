import React from "react";
import styles from "./CurrentWeatherModule.module.css";
import AddToFavorites from "../../../../ui/molecules/AddToFavorites/AddToFavorites";
import WEATHER_ICONS from "../WeatherIcons/WeatherIcons";
import { setTemperatureSign } from "../../../../utils/utils";

const CurrentWeatherModule = ({
  onClick,
  isSaved,
  weatherData,
  location,
  settings,
}) => {
  const locationSection = (
    <p className={styles.location}>
      {location.city}, {location.country}
    </p>
  );
  const weatherBlock = (
    <div className={styles.weatherBlock}>
      <span className={styles.temperature}>
        {setTemperatureSign(weatherData.temperature)}°
      </span>
      {WEATHER_ICONS[weatherData.icon]}
    </div>
  );
  const description = (
    <p className={styles.description}>{weatherData.description}</p>
  );
  const moreInfoSection = (
    <div className={styles.moreInfo}>
      {settings.map(
        (set) =>
          set.isChecked && (
            <div key={set.id}>
              <h3 className="font-semibold text-slate-800 text-center">
                {set.value === "feelsLike" ? "feels like" : set.value}
              </h3>
              <p className="text-center">{weatherData[set.value]}</p>
            </div>
          )
      )}
    </div>
  );

  return (
    <div className={styles.currentWeather}>
      <AddToFavorites onClick={onClick} isSaved={isSaved} />
      {locationSection}
      {weatherBlock}
      {description}
      {moreInfoSection}
    </div>
  );
};

export default CurrentWeatherModule;
