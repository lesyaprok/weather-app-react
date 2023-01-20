export const SETTINGS = [
  { id: 1, value: "feelsLike", isChecked: false },
  { id: 2, value: "humidity", isChecked: false },
  { id: 3, value: "sunrise", isChecked: false },
  { id: 4, value: "sunset", isChecked: false },
  { id: 5, value: "wind", isChecked: false },
];

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
