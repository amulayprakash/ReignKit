import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { chains } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";

const config = {
  projectId: "6ea112bb251f26bee4cf7a5764cd3c63",
  theme: "dark",
  accentColor: "default",
  ethereum: {
    appName: "web3Modal",
    autoConnect: true,
    chains: [chains.mainnet, chains.polygon, chains.fantom],
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <React.StrictMode>
      <App />
      <Web3Modal config={config} />
    </React.StrictMode>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
