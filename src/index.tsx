import "normalize.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import { SolarSystemApp } from "./app/SolarSystemApp";

ReactDOM.render(
  <React.StrictMode>
    <App solarSystemApp={new SolarSystemApp()}></App>
  </React.StrictMode>,
  document.getElementById("root")
);
