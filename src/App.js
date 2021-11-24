import "./App.css";
import React from "react";

import Authentication from "./components/authentication/authentication.jsx";
import TeamBuilder from "./components/teamBuilder/teamBuilder.jsx";
import Authenticator from "./utils/Authentication";
import { useNavigate } from "react-router";

function App() {
  const [logIn, setLogIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (Authenticator.isAccountLogin()) {
      navigate("teamBuilder");
    }
  }, []);

  return (
    <main className="App">
      <Authentication logIn={logIn} setLogIn={setLogIn} />
    </main>
  );
}

export default App;
