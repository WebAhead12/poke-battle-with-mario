import React from "react";
import "./authentication.css";
import { useNavigate } from "react-router";
import Authenticator from "../../utils/Authentication";

const TYPING_ANIMATION_SPEED = 25;
const ERROR_TIMEOUT = 3000;

const accountErrors = {
  USERNAME_MISSING: "Please enter a username",
  PASSWORD_MISSING: "Please enter a password",
  PASSWORD_CONFIRMATION_MISSING: "Please enter password confirmation",
  WRONG_CONFIRMATION_PASSWORD_ERROR: "Password confirmation does not match",

  ACCOUNT_NOT_FOUND_ERROR: "Account details are incorrect",

  USERNAME_NOT_FOUND_ERROR: "Username not found",
  USERNAME_TAKEN_ERROR: "Username already taken",
  WRONG_PASSWORD_ERROR: "Password is incorrect",
  ACCOUNT_CREATED: "Account created successfully",
  DEFAULT: "An error has occured, please try again",
};

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [registerActive, setRegisterActive] = React.useState(false);
  const [error, setError] = React.useState("");
  const [typedError, setTypedError] = React.useState("");

  React.useEffect(() => {
    if (!typedError) return;
    if (!error) setTypedError("");
    if (typedError && error && typedError.length < error.length)
      setTimeout(
        setTypedError,
        TYPING_ANIMATION_SPEED,
        typedError + error.charAt(typedError.length)
      );
  }, [typedError]);

  React.useEffect(() => {
    if (!error) return;
    let tempError = error;
    setTypedError(tempError.charAt(0));
    let errorGC = setTimeout(() => {
      if (tempError === error) setError("");
      setTypedError("");
    }, ERROR_TIMEOUT + TYPING_ANIMATION_SPEED * error.length);
    return () => {
      clearTimeout(errorGC);
    };
  }, [error]);

  const navigate = useNavigate();

  return (
    <>
      <img src="./images/logo.png" className="imageLogo" alt="" />
      <div className="loginContainer">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          className="input"
          onBlur={(e) => setUsername(e.target.value)}
          onFocus={(e) => (e.target.value = "")}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          onBlur={(e) => setPassword(e.target.value)}
          onFocus={(e) => (e.target.value = "")}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className={!registerActive ? "input passwordConfirm" : "input"}
          onBlur={(e) => setConfirm(e.target.value)}
          onFocus={(e) => (e.target.value = "")}
        />
        <div className="responseBox">
          <p>{typedError}</p>
          {registerActive ? (
            <>
              <div
                name="register"
                className="button"
                onClick={() => {
                  if (!registerActive) return setRegisterActive(true);
                  if (!username)
                    return setError(accountErrors.USERNAME_MISSING);
                  if (!password)
                    return setError(accountErrors.PASSWORD_MISSING);
                  if (!confirm)
                    return setError(
                      accountErrors.PASSWORD_CONFIRMATION_MISSING
                    );
                  if (confirm !== password) {
                    setConfirm("");
                    return setError(
                      accountErrors.WRONG_CONFIRMATION_PASSWORD_ERROR
                    );
                  }
                  Authenticator.registerAccount(username, password);
                  setError(accountErrors.ACCOUNT_CREATED);
                  setRegisterActive(false);
                }}
              >
                Register
              </div>
              <div
                name="login"
                onClick={() => {
                  if (registerActive) return setRegisterActive(false);
                  if (!username)
                    return setError(accountErrors.USERNAME_MISSING);
                  if (!password)
                    return setError(accountErrors.PASSWORD_MISSING);
                  if (Authenticator.loginAccount(username, password)) {
                    navigate("teamBuilder");
                  } else {
                    setPassword("");
                    setError(accountErrors.ACCOUNT_NOT_FOUND_ERROR);
                  }
                }}
                className="button"
              >
                Log in
              </div>
            </>
          ) : null}

          {!registerActive ? (
            <>
              <div
                name="login"
                onClick={() => {
                  if (registerActive) return setRegisterActive(false);
                  if (!username)
                    return setError(accountErrors.USERNAME_MISSING);
                  if (!password)
                    return setError(accountErrors.PASSWORD_MISSING);
                  if (Authenticator.loginAccount(username, password)) {
                    navigate("teamBuilder");
                  } else {
                    setPassword("");
                    setError(accountErrors.ACCOUNT_NOT_FOUND_ERROR);
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
                  if (!registerActive) return setRegisterActive(true);
                  if (!username)
                    return setError(accountErrors.USERNAME_MISSING);
                  if (!password)
                    return setError(accountErrors.PASSWORD_MISSING);
                  if (!confirm)
                    return setError(
                      accountErrors.PASSWORD_CONFIRMATION_MISSING
                    );
                  if (confirm !== password) {
                    setConfirm("");
                    return setError(
                      accountErrors.WRONG_CONFIRMATION_PASSWORD_ERROR
                    );
                  }
                  Authenticator.registerAccount(username, password);
                  setError(accountErrors.ACCOUNT_CREATED);
                  setRegisterActive(false);
                }}
              >
                Register
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
