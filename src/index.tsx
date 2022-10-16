import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const findRoot = document.getElementById("root");

if (findRoot) {
  const root = ReactDOM.createRoot(findRoot);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
