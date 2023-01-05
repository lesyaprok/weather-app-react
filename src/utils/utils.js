const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const setTempteratureSign = (temperature) => {
  const roundedTemperature = Math.round(temperature);
  return roundedTemperature > 0 ? `+${roundedTemperature}` : roundedTemperature;
};

export { capitalize, setTempteratureSign };
