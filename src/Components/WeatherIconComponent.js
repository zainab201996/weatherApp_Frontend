import { React, useState } from "react";
import { Image } from "antd";
const WeatherIconComponent = ({ icon_url }) => {
  return (
    <div>
      <Image width={"7.5em"} src={icon_url} />
    </div>
  );
};

export default WeatherIconComponent;
