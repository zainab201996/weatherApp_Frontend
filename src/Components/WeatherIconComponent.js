import { React } from "react";
import "../css/WeatherIcon.css";
const WeatherIconComponent = ({ icon_url }) => {
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <img
        className="weather-icon"
        alt="Weather Icon"
        src={icon_url}
        onClick={handleClick}
      />
    </div>
  );
};

export default WeatherIconComponent;
