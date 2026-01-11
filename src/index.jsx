import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./UserContext"; // 👈 importa el provider

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* 👈 envuelve toda la app */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);