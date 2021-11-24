import React from "react";
import "./authentication.css";
import { useNavigate } from "react-router";
import Authenticator from "../../utils/Authentication";

export default function Authentication({ logIn, setLogIn }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const navigate = useNavigate();

  return (
    <>
      <img src="./images/pokeball.png" className="logoImg" />
      <form method="POST" className="inputForm">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          className="input"
          onBlur={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          onBlur={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input"
          onBlur={(e) => setConfirm(e.target.value)}
        />
        <div
          name="login"
          onClick={() => {
            if (Authenticator.loginAccount(username, password)) {
              navigate("teamBuilder");
            } else {
              console.log("Incorrect password");
            }
          }}
          className="loginButton"
        >
          Log in
        </div>
        <div
          name="register"
          className="registerButton"
          onClick={() => {
            console.log(username, password);
            if (confirm != password) {
              console.log("confirm doesnt match password");
            }
            if (username != "") {
              Authenticator.registerAccount(username, password);
            } else {
              console.log("username is invalid");
            }
          }}
        >
          Register
        </div>
      </form>
    </>
  );
}
