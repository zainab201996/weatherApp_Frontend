import axios from "axios";

const url = "http://localhost:5000/";
export const fetchIpLocation = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        reject(error.message);
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
        console.log(error.message);
        reject(error.message);
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
        console.log(error.message);
        reject(error.message);
      });
  });
};
