import React from "react";
import { ReactComponent as DayIcon } from "./animatedIcons/01d.svg";
import { ReactComponent as NightIcon } from "./animatedIcons/01n.svg";
import { ReactComponent as CloudDayIcon } from "./animatedIcons/cloudy-day-1.svg";
import { ReactComponent as CloudNightIcon } from "./animatedIcons/cloudy-night-1.svg";
import { ReactComponent as CloudIcon } from "./animatedIcons/cloudy.svg";
import { ReactComponent as RainIcon } from "./animatedIcons/rainy-5.svg";
import { ReactComponent as HeavyRainIcon } from "./animatedIcons/rainy-7.svg";
import { ReactComponent as SnowIcon } from "./animatedIcons/snowy-6.svg";
import { ReactComponent as ThunderIcon } from "./animatedIcons/thunder.svg";
import { ReactComponent as MistIcon } from "./animatedIcons/mist.svg";

const WEATHER_ICONS = {
  "01d": <DayIcon />,
  "01n": <NightIcon />,
  "02d": <CloudDayIcon />,
  "02n": <CloudNightIcon />,
  "03d": <CloudIcon />,
  "03n": <CloudIcon />,
  "04d": <CloudIcon />,
  "04n": <CloudIcon />,
  "09d": <HeavyRainIcon />,
  "09n": <HeavyRainIcon />,
  "10d": <RainIcon />,
  "10n": <RainIcon />,
  "11d": <ThunderIcon />,
  "11n": <ThunderIcon />,
  "13d": <SnowIcon />,
  "13n": <SnowIcon />,
  "50d": <MistIcon />,
  "50n": <MistIcon />,
};

export default WEATHER_ICONS;
