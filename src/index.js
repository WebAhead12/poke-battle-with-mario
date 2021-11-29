import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import TeamBuilder from "./components/teamBuilder/teamBuilder";
import Authentication from "./components/authentication/authentication";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/teamBuilder" element={<TeamBuilder />} />
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
