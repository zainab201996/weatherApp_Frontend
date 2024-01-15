import React from "react";

const TemperatureDisplayComponent = ({ temperature }) => {
  const conditionStyle = {
    fontSize: "2em",
    margin: "auto",
    fontWeight: "200",
  };
  const temperatureStyle = {
    fontSize: "4em",
    margin: "auto",
    fontWeight: "200",
  };
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <p style={conditionStyle}>{temperature.condition}</p>
        <p style={temperatureStyle}>{`${temperature.temperature_in_c}°C`}</p>
      </div>
    </div>
  );
};

export default TemperatureDisplayComponent;
