const getLocationByIPService = async () => {
  const response = await fetch("https://ipapi.co/json");
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return Promise.reject(response);
};

export default getLocationByIPService;
