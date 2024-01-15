import { React, useEffect, useState } from "react";
import { Button, Layout, Row, Col } from "antd";
import "../css/WeatherDisplayComponent.css";
import { CaretLeftOutlined, CaretRightFilled } from "@ant-design/icons";
import {
  fetchWeatherData,
  fetchForecastData,
  fetchIpLocation,
} from "../api/weatherApi.js";
import { useNavigate } from "react-router-dom";
import SearchBarComponent from "./SearchBarComponent.js";
import LocationDisplayComponent from "./LocationDisplayComponent.js";
import TemperatureDisplayComponent from "./TemperatureDisplayComponent.js";
import TimeSliderComponent from "./TimeSliderComponent.js";
import WeatherIconComponent from "./WeatherIconComponent.js";
import DateTimeComponent from "./DateTimeComponent.js";
const containerLayoutStyle = {
  display: "flex",
  alignItems: "center",
  background: "#FFFFFF",
};

const layoutStyle = {
  borderRadius: 10,
  overflow: "hidden",
  margin: "1%",
  width: "60%",
  maxWidth: "80%",
  background: "#4096ff",
  color: "#FFFFFF",
};

const barLayoutStyle = {
  borderRadius: 2,
  overflow: "hidden",
  margin: "2%",
  width: "60%",
  maxWidth: "80%",
  color: "#FFFFFF",
};

const currentWeatherStyle = { height: "22em" };
const forecastWeatherStyle = { height: "22em" };

const WeatherDisplayComponent = ({ currentMode }) => {
  async function getWeatherData(searchString) {
    let weatherData = await fetchWeatherData(searchString);
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
    setIsLoading(false);
  }
  async function getForecastData() {
    let weatherData = await fetchForecastData(currentWeatherData.city);
    console.log(weatherData);
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
    setForecastData(weatherData.forecast_array);
  }
  function updateWeatherData(weatherData) {
    console.log(weatherData);
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
      await getForecastData();
      navigate("/weather/forecast");
    } else {
      await getWeatherData(currentWeatherData.city);
      navigate("/weather/current");
    }
    setIsCurrent(!isCurrent);
  }
  useEffect(() => {
    async function fetchLocationData() {
      const location = await fetchIpLocation();
      getWeatherData(`${location.longitude},${location.latitude}`);
      setIsCurrent(currentMode);
    }
    fetchLocationData();
    return () => {
      setIsLoading(true);
      setCurrentWeatherData({});
      setForecastData({});
      setIsCurrent(true);
    };
  }, [currentMode]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [isCurrent, setIsCurrent] = useState(currentMode);
  return !isLoading ? (
    <div>
      {!isCurrent ? (
        <Row>
          <Col sm={1} xs={4} style={{ display: "contents" }}>
            <Button
              type="link"
              onClick={handleMode}
              icon={<CaretLeftOutlined />}
            />
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
      <Layout style={containerLayoutStyle}>
        <Layout style={layoutStyle}>
          <DateTimeComponent
            dateTime={{
              date: currentWeatherData.date,
              time: currentWeatherData.time,
            }}
          />
          <Row
            className="weatherContent"
            style={isCurrent ? currentWeatherStyle : forecastWeatherStyle}
          >
            <Col
              className="weatherIcon"
              xs={24}
              sm={isCurrent ? 12 : 24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <WeatherIconComponent icon_url={currentWeatherData.icon_url} />
            </Col>
            <Col
              className="weatherInfo"
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
            {isCurrent ? (
              <Col
                xs={5}
                sm={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: 15,
                  }}
                >
                  <Button
                    type="link"
                    icon={<CaretRightFilled />}
                    onClick={handleMode}
                  />
                </div>
              </Col>
            ) : (
              <div></div>
            )}
          </Row>
        </Layout>

        <Layout style={barLayoutStyle}>
          {isCurrent ? (
            <SearchBarComponent getWeatherData={getWeatherData} />
          ) : (
            <TimeSliderComponent
              updateWeatherData={updateWeatherData}
              forecast_array={forecastData}
              currentHour={currentWeatherData.time.split(":")[0]}
            />
          )}
        </Layout>
      </Layout>
    </div>
  ) : (
    <div></div>
  );
};

export default WeatherDisplayComponent;
