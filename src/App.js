import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./css/Application.css";
import WeatherDisplayComponent from "./Components/WeatherDisplayComponent.js";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to="/weather/current" />}
          />
          <Route
            path="/weather/current"
            exact
            element={<WeatherDisplayComponent currentMode={true} />}
          />
          <Route
            path="/weather/forecast"
            exact
            element={<WeatherDisplayComponent currentMode={false} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
