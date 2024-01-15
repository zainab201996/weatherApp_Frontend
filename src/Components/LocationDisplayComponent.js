import { React, useState } from "react";

const LocationDisplayComponent = ({ location }) => {
  const locationContainerStyle = {
    fontSize: location.fontSize == "small" ? "1em" : "1.2em",
    textAlign: location.textAligned,
    fontWeight: "100",
  };
  const contentStyle = {
    margin: location.fontSize == "small" ? "0.1em" : "0.2em",
  };
  return (
    <div>
      <div>
        <div style={locationContainerStyle}>
          <p style={contentStyle}>
            {location.city}, {location.state}
          </p>
          <p style={contentStyle}>{location.country}</p>
        </div>
      </div>
    </div>
  );
};

export default LocationDisplayComponent;
