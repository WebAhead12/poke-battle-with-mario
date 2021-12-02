import React from "react";
import styles from "./authentication.module.css";
import { useNavigate } from "react-router";
import Authenticator from "../../utils/Authentication";

//Configurations
const TYPING_ANIMATION_SPEED = 25;
const ERROR_TIMEOUT = 3000;

//Error Messages
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

// Authentication Component
export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [user, setUser] = React.useState({});
  const [registerActive, setRegisterActive] = React.useState(false);
  const [error, setError] = React.useState("");
  const [typedError, setTypedError] = React.useState("");

  //  Writes the error message char by char, till it matches the error value.
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

  // Changes the error message, which triggers the error message writer useEffect.
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

  React.useEffect(() => {
    if (Authenticator.isAccountLogin()) {
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();

  function loginAccount(e) {
    if (e && e.type !== "click" && e.key !== "Enter") return;
    if (registerActive) return setRegisterActive(false);
    if (!username) return setError(accountErrors.USERNAME_MISSING);
    if (!password) return setError(accountErrors.PASSWORD_MISSING);
    Authenticator.login({ username: username, password: password }).then(
      (response) => {
        if (!response.status) {
          console.log(response);
          window.localStorage.setItem("access_token", response.access_token);
          navigate("/");
        } else {
          setPassword("");
          setError(accountErrors.ACCOUNT_NOT_FOUND_ERROR);
        }
      }
    );
  }

  function registerAccount(e) {
    if (e && e.type !== "click" && e.key !== "Enter") return;
    if (!registerActive) return setRegisterActive(true);
    if (!username) return setError(accountErrors.USERNAME_MISSING);
    if (!password) return setError(accountErrors.PASSWORD_MISSING);
    if (!confirm) return setError(accountErrors.PASSWORD_CONFIRMATION_MISSING);
    if (confirm !== password) {
      setConfirm("");
      return setError(accountErrors.WRONG_CONFIRMATION_PASSWORD_ERROR);
    }
    Authenticator.register({ username: username, password: password }).then(
      (response) => {
        if (response.status == "createUserSuccess") {
          setError(accountErrors.ACCOUNT_CREATED);
          setRegisterActive(false);
        } else if (response.status == "createUserTaken") {
          setError(accountErrors.USERNAME_TAKEN_ERROR);
          setPassword("");
          setConfirm("");
        }
      }
    );
  }

  // Chooses whether register account should activate or login account on enter key press.
  const keyPressChooser = (isRegisterActive) =>
    isRegisterActive ? registerAccount : loginAccount;

  return (
    <>
      <img
        src="./images/2892303.jpg"
        className={styles.backgroundImage}
        alt=""
      />
      <img src="./images/logo.png" className={styles.imageLogo} alt="" />
      <div className={styles.loginContainer}>
        {/* Username input box */}
        <input
          type="text"
          name="userName"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={(e) => (e.target.value = "")}
          onKeyPress={keyPressChooser(registerActive)}
        />
        {/* Password input box */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={(e) => (e.target.value = "")}
          onKeyPress={keyPressChooser(registerActive)}
        />
        {/* Confirm password input box, shown only when registration mode is active. */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className={
            !registerActive
              ? `${styles.input} ${styles.passwordConfirm}`
              : styles.input
          }
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          onFocus={(e) => (e.target.value = "")}
          onKeyPress={keyPressChooser(registerActive)}
        />
        <div className={styles.responseBox}>
          <p>{typedError}</p>
          {/* Swaps between login and register position according to if registeration mode is active. */}
          {registerActive ? (
            <>
              <div
                name="register"
                className={styles.button}
                onClick={registerAccount}
              >
                Register
              </div>
              <div
                name="login"
                onClick={loginAccount}
                className={styles.button}
              >
                Log in
              </div>
            </>
          ) : (
            <>
              <div
                name="login"
                onClick={loginAccount}
                className={styles.button}
              >
                Log in
              </div>
              <div
                name="register"
                className={styles.button}
                onClick={registerAccount}
              >
                Register
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
