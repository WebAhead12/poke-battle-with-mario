import React from "react";
import styles from "./game.module.css";
import Authenticator from "../../utils/Authentication";
import { useNavigate } from "react-router";

export default function Game() {
  const [marioHealth, setMarioHealth] = React.useState(50);
  const [playerHealth, setPlayerHealth] = React.useState(50);

  const [playerTurn, setPlayerTurn] = React.useState(true);

  const [enemyAttacked, setEnemyAttacked] = React.useState(false);
  const [playerAttacked, setPlayerAttacked] = React.useState(false);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.gameWindow}>
          <div className={styles.enemyStats}>
            <div className="mario">Mario: Pikachu</div>
            <div className="marioHealth">{"HP:" + marioHealth}</div>
            <div className="marioPokemons">* * * * *</div>
          </div>
          <div className={styles.pokemonBattle}>
            <img
              className={
                playerAttacked
                  ? `${styles.playerPokemon} ${styles.playerAttack}`
                  : `${styles.playerPokemon}`
              }
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/248.png"
            ></img>
            <img
              className={
                enemyAttacked
                  ? `${styles.enemyPokemon} ${styles.enemyAttack}`
                  : `${styles.enemyPokemon}`
              }
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            ></img>
          </div>
          <div className={styles.playerStats}>
            <div className="mario">George: Megalodon</div>
            <div className="marioHealth">{"HP:" + playerHealth}</div>
            <div className="marioPokemons">* * * * *</div>
          </div>
        </div>
        <div className={styles.attacksWindow}>
          <button
            disabled={!playerTurn}
            className={`${styles.move} ${styles.move1}`}
            onClick={(e) => {
              if (playerTurn) {
                setPlayerAttacked(true);
                setPlayerTurn(false);

                setTimeout(() => {
                  setPlayerAttacked(false);
                  setTimeout(() => {
                    setMarioHealth(marioHealth - 5);
                  }, 500);
                }, 1000);

                setTimeout(() => {
                  setEnemyAttacked(true);
                  setTimeout(() => {
                    setEnemyAttacked(false);
                    setPlayerHealth(playerHealth - 5);

                    setTimeout(() => {
                      setPlayerTurn(true);
                    }, 750);
                  }, 1000);
                }, 2000);
              }
            }}
          >
            Scratch
          </button>
          <button
            disabled={!playerTurn}
            className={`${styles.move} ${styles.move2}`}
            onClick={(e) => {
              if (playerTurn) {
                setPlayerAttacked(true);
                setPlayerTurn(false);

                setTimeout(() => {
                  setPlayerAttacked(false);
                  setTimeout(() => {
                    setMarioHealth(marioHealth - 5);
                  }, 500);
                }, 1000);

                setTimeout(() => {
                  setEnemyAttacked(true);
                  setTimeout(() => {
                    setEnemyAttacked(false);
                    setPlayerHealth(playerHealth - 5);

                    setTimeout(() => {
                      setPlayerTurn(true);
                    }, 750);
                  }, 1000);
                }, 2000);
              }
            }}
          >
            Growl
          </button>
          <button
            disabled={!playerTurn}
            className={`${styles.move} ${styles.move3}`}
            onClick={(e) => {
              if (playerTurn) {
                setPlayerAttacked(true);
                setPlayerTurn(false);

                setTimeout(() => {
                  setPlayerAttacked(false);
                  setTimeout(() => {
                    setMarioHealth(marioHealth - 5);
                  }, 500);
                }, 1000);

                setTimeout(() => {
                  setEnemyAttacked(true);
                  setTimeout(() => {
                    setEnemyAttacked(false);
                    setPlayerHealth(playerHealth - 5);

                    setTimeout(() => {
                      setPlayerTurn(true);
                    }, 750);
                  }, 1000);
                }, 2000);
              }
            }}
          >
            Headbutt
          </button>
          <button
            disabled={!playerTurn}
            className={`${styles.move} ${styles.move4}`}
            onClick={(e) => {
              if (playerTurn) {
                setPlayerAttacked(true);
                setPlayerTurn(false);

                setTimeout(() => {
                  setPlayerAttacked(false);
                  setTimeout(() => {
                    setMarioHealth(marioHealth - 5);
                  }, 500);
                }, 1000);

                setTimeout(() => {
                  setEnemyAttacked(true);
                  setTimeout(() => {
                    setEnemyAttacked(false);
                    setPlayerHealth(playerHealth - 5);

                    setTimeout(() => {
                      setPlayerTurn(true);
                    }, 750);
                  }, 1000);
                }, 2000);
              }
            }}
          >
            Hyper fang
          </button>
        </div>
      </div>
    </main>
  );
}
