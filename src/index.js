import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// toastify css
import "react-toastify/dist/ReactToastify.css";
// You can also use <link> for styles

import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
