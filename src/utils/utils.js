const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const setTempteratureSign = (temperature) => {
  const roundedTemperature = Math.round(temperature);
  return roundedTemperature > 0 ? `+${roundedTemperature}` : roundedTemperature;
};

const getCountryByCode = (code) => {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(code);
};

const getTimeFromTimestamp = (timestamp) => {
  const date = new Date(1000 * timestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
};

export {
  capitalize,
  setTempteratureSign,
  getCountryByCode,
  getTimeFromTimestamp,
};
