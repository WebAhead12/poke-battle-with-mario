import React from "react";
import styles from "./homePage.module.css";
import Authenticator from "../../utils/Authentication";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const [audio] = React.useState(
    new Audio("./audio/main-menu-background-music.m4a")
  );

  React.useEffect(() => {
    audio.loop = true;

    audio.play();
    if (!Authenticator.isAccountLogin()) {
      navigate("/authentication");
    }
    return () => {
      audio.pause();
    };
  }, []);

  return (
    <main
      onClick={() => {
        audio.play();
      }}
    >
      <img
        src="./images/homepage-background.gif"
        className={styles.backgroundGif}
        alt=""
      />
      <img src="./images/logo.png" className={styles.imageLogo} alt="" />
      <div className={styles.buttonsContainer}>
        <button className={styles.menuButton} onClick={() => navigate("/game")}>
          Battle
        </button>
        <button
          className={styles.menuButton}
          onClick={() => navigate("/teamBuilder")}
        >
          Team Builder
        </button>
        <button
          className={styles.menuButton}
          onClick={() => {
            Authenticator.logoutAccount();
            navigate("/");
          }}
        >
          Log-Out
        </button>
      </div>
    </main>
  );
}
