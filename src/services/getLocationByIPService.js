const getLocationByIPService = async () => {
  const response = await fetch("http://ip-api.com/json");
  const data = await response.json();
  return data;
};

export default getLocationByIPService;
