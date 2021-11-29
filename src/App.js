import "./App.css";
import React from "react";

import Authentication from "./components/authentication/authentication.jsx";
import HomePage from "./components/homePage/homePage.jsx";
import Authenticator from "./utils/Authentication";

import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!Authenticator.isAccountLogin()) {
      navigate("/authentication");
    }
  });
  return (
    <main className="App">
      <HomePage></HomePage>
    </main>
  );
}

export default App;
