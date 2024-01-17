import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Row, Col, notification } from "antd";
import "../css/WeatherDisplayComponent.css";
import { CaretLeftOutlined, CaretRightFilled } from "@ant-design/icons";
import {
  fetchWeatherData,
  fetchForecastData,
  fetchIpLocation,
} from "../api/weatherApi.js";
import SearchBarComponent from "./SearchBarComponent.js";
import LocationDisplayComponent from "./LocationDisplayComponent.js";
import TemperatureDisplayComponent from "./TemperatureDisplayComponent.js";
import TimeSliderComponent from "./TimeSliderComponent.js";
import WeatherIconComponent from "./WeatherIconComponent.js";
import DateTimeComponent from "./DateTimeComponent.js";

const { Content } = Layout;
const containerLayoutStyle = {
  display: "flex",
  alignItems: "center",
  background: "#FFFFFF",
};

const currentWeatherStyle = { height: "22em" };
const iconStyle = { fontSize: "3.5em" };
const loadingStyle = { display: "flex", justifyContent: "center" };
const WeatherDisplayComponent = ({ currentMode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [isCurrent, setIsCurrent] = useState(currentMode);
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const location = await fetchIpLocation();

        const weatherData = await fetchWeatherData(
          `${location.latitude},${location.longitude}`
        );
        setCurrentWeatherData({
          city: weatherData.location.name || "N/A",
          country: weatherData.location.country || "N/A",
          state: weatherData.location.region || "N/A",
          temperature_in_c: weatherData.temperature_in_c || "",
          temperature_in_f: weatherData.temperature_in_f || "",
          condition: weatherData.weather_condition || "",
          icon_url: weatherData.weather_icon_url || "",
          date: new Date(weatherData.current_time.split(" ")[0]) || "",
          time: weatherData.current_time.split(" ")[1] || "",
        });
        const forecastData = await fetchForecastData(
          `${location.latitude},${location.longitude}`
        );
        setForecastData(forecastData.forecast_array);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocationData();
    return () => {
      setIsLoading(true);
      setCurrentWeatherData({});
      setForecastData({});
      setIsCurrent(true);
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("city_name", currentWeatherData.city);
  }, [currentWeatherData]);

  async function setWeatherData(searchString) {
    try {
      setIsLoading(true);
      const weatherData = await fetchWeatherData(searchString);
      const forecastData = await fetchForecastData(searchString);

      setCurrentWeatherData({
        city: weatherData.location.name || "N/A",
        country: weatherData.location.country || "N/A",
        state: weatherData.location.region || "N/A",
        temperature_in_c: weatherData.temperature_in_c || "",
        temperature_in_f: weatherData.temperature_in_f || "",
        condition: weatherData.weather_condition || "",
        icon_url: weatherData.weather_icon_url || "",
        date: new Date(weatherData.current_time.split(" ")[0]) || "",
        time: weatherData.current_time.split(" ")[1] || "",
      });
      setForecastData(forecastData.forecast_array);
    } catch (error) {
      openNotification(error.status);
    } finally {
      setIsLoading(false);
    }
  }

  function updateWeatherData(weatherData) {
    setCurrentWeatherData({
      ...currentWeatherData,
      temperature_in_c: weatherData.temperature_in_c || "",
      temperature_in_f: weatherData.temperature_in_f || "",
      condition: weatherData.weather_condition || "",
      icon_url: weatherData.weather_icon_url || "",
      date: new Date(weatherData.time.split(" ")[0]) || "",
      time: weatherData.time.split(" ")[1] || "",
    });
  }

  async function handleMode() {
    if (isCurrent) {
      setIsCurrent(!isCurrent);
    } else {
      setIsCurrent(!isCurrent);
    }
  }

  const openNotification = (status_code) => {
    notification.error({
      message: "Error",
      description: `Search key should be a valid name of country, city or state.
         It can also be a latitude,longitude pair separated by comma`,
      onClick: () => {},
    });
  };

  return (
    <div>
      {isLoading ? (
        <h1 style={loadingStyle}>Loading...</h1>
      ) : (
        <div>
          {!isCurrent ? (
            <Row>
              <Col sm={1} xs={4} style={{ display: "contents" }}>
                <NavLink to="/weather/current" onClick={handleMode}>
                  <CaretLeftOutlined style={iconStyle} />
                </NavLink>
              </Col>
              <Col sm={23} xs={20}>
                <LocationDisplayComponent
                  location={{
                    city: currentWeatherData.city,
                    country: currentWeatherData.country,
                    state: currentWeatherData.state,
                    textAligned: "left",
                    fontSize: "small",
                  }}
                />
              </Col>
            </Row>
          ) : (
            <div></div>
          )}
          <Layout className="container" style={containerLayoutStyle}>
            <Content style={{ position: "relative", width: "100%" }}>
              {isCurrent ? (
                <div className="responsive-forecast-link">
                  <NavLink to="/weather/forecast" onClick={handleMode}>
                    <CaretRightFilled style={iconStyle} />
                  </NavLink>
                </div>
              ) : (
                <div></div>
              )}

              <Layout className="content-layout">
                <DateTimeComponent
                  dateTime={{
                    date: currentWeatherData.date,
                    time: currentWeatherData.time,
                  }}
                />
                <Row className="weatherContent" style={currentWeatherStyle}>
                  <Col
                    xs={24}
                    sm={isCurrent ? 12 : 24}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <WeatherIconComponent
                      icon_url={currentWeatherData.icon_url}
                    />
                  </Col>
                  <Col
                    style={
                      isCurrent
                        ? {
                            display: "grid",
                            placeItems: "center end",
                            textAlign: "right",
                          }
                        : {
                            display: "grid",
                            placeItems: "center ",
                            textAlign: "center",
                          }
                    }
                    xs={isCurrent ? 19 : 24}
                    sm={isCurrent ? 11 : 24}
                  >
                    <Row>
                      <TemperatureDisplayComponent
                        temperature={{
                          temperature_in_c: currentWeatherData.temperature_in_c,
                          temperature_in_f: currentWeatherData.temperature_in_f,
                          condition: currentWeatherData.condition,
                        }}
                      />
                    </Row>
                    <Row style={{ textAlign: "right" }}>
                      <LocationDisplayComponent
                        location={{
                          city: currentWeatherData.city,
                          country: currentWeatherData.country,
                          state: currentWeatherData.state,
                          textAligned: isCurrent ? "right" : "center",
                        }}
                      />
                    </Row>
                  </Col>
                </Row>
              </Layout>

              <Layout className="bar-layout">
                {isCurrent ? (
                  <SearchBarComponent setWeatherData={setWeatherData} />
                ) : (
                  <TimeSliderComponent
                    updateWeatherData={updateWeatherData}
                    forecast_array={forecastData}
                    currentHour={currentWeatherData.time.split(":")[0]}
                  />
                )}
              </Layout>
            </Content>
          </Layout>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplayComponent;
