const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const setTemperatureSign = (temperature) => {
  const roundedTemperature = Math.round(temperature);
  return roundedTemperature > 0 ? `+${roundedTemperature}` : roundedTemperature;
};

const getCountryByCode = (code) => {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(code);
};

const getTimeFromTimestamp = (ts, timezone) => {
  const date = new Date((ts + timezone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};

const getDateFromTimestamp = (ts) => {
  const date = new Date(ts * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}`;
};

export {
  capitalize,
  setTemperatureSign,
  getCountryByCode,
  getTimeFromTimestamp,
  getDateFromTimestamp,
};
