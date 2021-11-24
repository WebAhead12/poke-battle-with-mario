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
      <img src="./images/logo.png" className="imageLogo" />
      <div className="loginContainer">
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
          className="input passwordConfirm"
          onBlur={(e) => setConfirm(e.target.value)}
        />
        <div className="responseBox">
          <p></p>
          <div
            name="login"
            onClick={() => {
              if (Authenticator.loginAccount(username, password)) {
                navigate("teamBuilder");
              } else {
                console.log("Incorrect password");
              }
            }}
            className="button"
          >
            Log in
          </div>
          <div
            name="register"
            className="button"
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
        </div>

      </div>
    </>
  );
}
