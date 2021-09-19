import "normalize.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { App } from "./app/App";
import { LoadingIndicator } from "./components/LoadingIndicator";

ReactDOM.render(
  <React.StrictMode>
    <LoadingIndicator />
  </React.StrictMode>,
  document.getElementById("root")
);

const app = new App();
app.init().then(() => {
  app.animate();
});
