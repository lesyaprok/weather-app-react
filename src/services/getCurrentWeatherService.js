import constants from "./constants";

const { BASE_URL_WEATHER, WEATHER_API_KEY } = constants;

const getCurrentWeatherService = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL_WEATHER}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
  );
  const data = response.json();
  return data;
};

export default getCurrentWeatherService;
