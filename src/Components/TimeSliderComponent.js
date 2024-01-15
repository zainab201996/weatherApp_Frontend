import { React, useEffect, useState } from "react";
import { Slider } from "antd";
const TimeSliderComponent = ({ updateWeatherData, forecast_array }) => {
  const formatHour = (hour) => {
    const formatted_time = hour === 0 || hour === 12 ? 12 : hour % 12;
    return hour > 11 ? `${formatted_time} PM` : `${formatted_time} AM`;
  };
  function handleChange(value) {
    const time_str = formatHour(value);
    setTimeValue(time_str);
    setSliderValue(value);
    updateWeatherData(forecast_array[value]);
  }
  const sliderTimeStyle = {
    textAlign: "center",
    color: "#4096ff",
    fontWeight: "400",
  };
  const marks = {
    0: "12 AM",
    23: "11 PM",
  };
  const [sliderValue, setSliderValue] = useState("");
  const [timeValue, setTimeValue] = useState("12 AM");
  return (
    <div style={{ margin: "20px" }}>
      <h1 style={sliderTimeStyle}>{timeValue}</h1>
      {
        <Slider
          range
          min={0}
          max={23}
          step={1}
          value={sliderValue}
          onChange={handleChange}
          marks={marks}
          defaultValue={10}
          tipFormatter={null}
        />
      }
    </div>
  );
};

export default TimeSliderComponent;
