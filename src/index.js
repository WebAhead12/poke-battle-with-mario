import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import TeamBuilder from "./components/teamBuilder/teamBuilder";
import Authentication from "./components/authentication/authentication";
import Game from "./components/game/game";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/teamBuilder" element={<TeamBuilder />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
