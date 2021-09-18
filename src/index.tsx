import "./index.css";

import { App } from "./app/App";

const app = new App();

app.init().then(() => {
  app.animate();
});
