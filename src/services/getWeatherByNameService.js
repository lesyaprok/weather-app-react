import constants from "./constants";

const { BASE_URL_WEATHER, WEATHER_API_KEY } = constants;

const getWeatherByNameService = async (cityName) => {
  const response = await fetch(
    `${BASE_URL_WEATHER}/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`
  );
  if (response.ok) {
    const data = response.json();
    return data;
  }
  return Promise.reject(response);
};

export default getWeatherByNameService;
