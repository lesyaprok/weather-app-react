export const SETTINGS = {
  optional: [
    { id: 1, value: "feelsLike", isChecked: false },
    { id: 2, value: "humidity", isChecked: false },
    { id: 3, value: "wind", isChecked: false },
    { id: 4, value: "sunrise", isChecked: false },
    { id: 5, value: "sunset", isChecked: false },
  ],
  blocks: [
    { id: 6, value: "5 days weather", isChecked: false },
    { id: 7, value: "hourly weather", isChecked: false },
  ],
};

export const INITIAL_LOCATION_OBJECT = {
  lat: null,
  lon: null,
  city: "",
  country: "",
};

export const INITIAL_WEATHER_OBJECT = {
  temperature: null,
  description: "",
  icon: "",
  wind: "",
  humidity: "",
  sunset: "",
  sunrise: "",
};
