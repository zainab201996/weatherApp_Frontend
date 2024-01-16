import axios from "axios";

const url = "https://weather-app-backend-laed.onrender.com/";
export const fetchIpLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  });
};
export const fetchWeatherData = (searchString) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + "api/weather", { params: { searchString } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject({ status: error.response.status });
      });
  });
};

export const fetchForecastData = (searchString) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + "api/forecast", { params: { searchString } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject({ status: error.response.status });
      });
  });
};
