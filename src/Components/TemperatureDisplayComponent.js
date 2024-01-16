import { useState, React } from "react";

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
  const handleChange = (event) => {
    setisCentigrade(!isCentigrade);
  };
  const [isCentigrade, setisCentigrade] = useState(true);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <p style={conditionStyle}>{temperature.condition}</p>
        <p style={temperatureStyle} onClick={handleChange}>
          {isCentigrade
            ? `${
                temperature.temperature_in_c === ""
                  ? 0
                  : temperature.temperature_in_c
              }°C`
            : `${temperature.temperature_in_f}°F`}
        </p>
      </div>
    </div>
  );
};

export default TemperatureDisplayComponent;
