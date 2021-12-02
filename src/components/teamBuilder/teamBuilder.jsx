import React from "react";
import Authenticator from "../../utils/Authentication";
import TeamData from "../../utils/teamData";
import { useNavigate } from "react-router";
import itemsList from "../data/itemsList.js";
import styles from "./teamBuilder.module.css";
import classNames from "classnames";

const formatString = (string) => {
  let strArray = [];
  let temp = string + "";
  if (temp)
    temp.split("-").forEach((word, index) => {
      strArray[index] = word[0].toUpperCase() + word.slice(1);
    });
  return strArray.join(" ");
};

export default function TeamBuilder() {
  //pokemon search
  const [search, setSearch] = React.useState("");
  //pokemon data
  const [imageUrl, setImageUrl] = React.useState("");
  const [pokemon, setPokemon] = React.useState("");
  //all pokemon moves
  const [moves, setMoves] = React.useState([]);
  const [selectedMove, setSelectedMove] = React.useState("");
  const [selectedMoves, setSelectedMoves] = React.useState([]);
  //pokemon moves description
  const [moveData, setMoveData] = React.useState({});
  //all pokemon items
  const [selectedItem, setSelectedItem] = React.useState("");

  const [pokemonNumber, setPokemonNumber] = React.useState(1);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!!pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.moves);
          setImageUrl(data.sprites.front_default);
          setMoves(data.moves);
        });
    }
  }, [pokemon]);

  React.useEffect(() => {
    if (!Authenticator.isAccountLogin()) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    if (selectedMove) {
      fetch(`https://pokeapi.co/api/v2/move/${selectedMove}`)
        .then((response) => response.json())
        .then((data) => {
          setMoveData({
            accuracy: data.accuracy,
            damageClass: data.damage_class.name,
            description: data.effect_entries[0].short_effect,
            power: data.power,
            pp: data.pp,
            type: data.type.name,
            effectChance: data.effect_chance,
          });
        });
    }
  }, [selectedMove]);

  React.useEffect(() => {
    const data = TeamData.getPokemonData(pokemonNumber);
    if (data) {
      setPokemon(data["pokemon" + pokemonNumber].name);
      setImageUrl(data["pokemon" + pokemonNumber].sprite);
      let moves = [];
      for (var i in data["pokemon" + pokemonNumber].moves) {
        moves.push(data["pokemon" + pokemonNumber].moves[i]);
      }
      setSelectedMoves(moves);
      setSelectedItem(data["pokemon" + pokemonNumber].item);
    } else {
      setPokemon("");
      setImageUrl("");
      setSelectedMoves([]);
      setSelectedItem("");
    }
  }, [pokemonNumber]);

  return (
    <main>
      <img
        src="./images/teambuilder-background.jpg"
        className={styles.backgroundImage}
        alt=""
      />
      <div>
        <span className={styles.pokeNum}>{pokemonNumber}</span>
        <div id="searchInput" className={styles.searchDiv}>
          <input
            name="search"
            placeholder="Search for a pokemon..."
            className={styles.searchInput}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key !== "Enter") return;
              if (TeamData.isPokemonExists(pokemonNumber)) {
                setSelectedItem("");
                setSelectedMoves([]);
                setSelectedMove("");
              }
              setPokemon(search.toLowerCase());
              e.target.blur();
              e.target.value = "";
            }}
            onFocus={(e) => (e.target.value = "")}
          />
          <img className={styles.pokemonImage} src={imageUrl} alt="" />
        </div>
        <div className={styles.movesAndDescription}>
          <ul className={styles.moves}>
            {moves.map((move) => {
              return (
                <li
                  className={classNames({
                    [styles.moveItem]: true,
                    [styles.highlighted]:
                      selectedMoves.indexOf(move.move.name) != -1,
                  })}
                  key={move.move.name}
                  onClick={(e) => {
                    if (!selectedMoves.includes(move.move.name)) {
                      if (selectedMoves.length < 4) {
                        setSelectedMove(move.move.name);
                        setSelectedMoves(selectedMoves.concat(move.move.name));
                      } else alert("Please select only 4 moves");
                    } else {
                      setSelectedMove("");
                      setSelectedMoves(
                        selectedMoves.filter(
                          (move1) => move1 !== move.move.name
                        )
                      );
                    }
                  }}
                >
                  {formatString(move.move.name)}
                </li>
              );
            })}
          </ul>
          {selectedMove ? (
            <div className={styles.description}>
              <h1 className={styles.moveName}>{formatString(selectedMove)}</h1>
              <p className={styles.moveDescription}>
                {moveData.description
                  ? moveData.description.replace(
                      "$effect_chance",
                      moveData.effectChance
                    )
                  : null}
              </p>
              <div className={styles.moveMisc}>
                <div className={styles.moveStats}>
                  {moveData.pp ? (
                    <span className={styles.movePP}>PP:{moveData.pp}</span>
                  ) : null}
                  {moveData.accuracy ? (
                    <span className={styles.moveAccuracy}>
                      ACC:{moveData.accuracy}
                    </span>
                  ) : null}
                  {moveData.power ? (
                    <span className={styles.movePower}>
                      PWR:{moveData.power}
                    </span>
                  ) : null}
                </div>
                <div className={styles.moveInfo}>
                  <span className={styles.moveType}>Type: {moveData.type}</span>
                  <span className={styles.moveDamageClass}>
                    {moveData.damageClass}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className={styles.itemsAndDescription}>
          <div className={styles.items}>
            {itemsList.map((item) => {
              return (
                <img
                  alt=""
                  src={item.sprites.default}
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                />
              );
            })}
          </div>
          {selectedItem ? (
            <div className={styles.description}>
              <h1 className={styles.itemName}>
                {formatString(selectedItem.name)}
              </h1>
              <p className={styles.itemDescription}>
                {selectedItem.entry ? selectedItem.entry[0].short_effect : null}
              </p>
            </div>
          ) : null}
        </div>
        <div>
          {pokemonNumber > 1 ? (
            <button
              onClick={() => {
                setPokemonNumber(pokemonNumber - 1);
              }}
            >
              Previous
            </button>
          ) : (
            <button onClick={() => navigate("/")}> Back </button>
          )}
          {pokemonNumber < 6 ? (
            <button
              onClick={() => {
                TeamData.addPokemon(
                  pokemonNumber,
                  pokemon,
                  imageUrl,
                  {
                    move1: selectedMoves[0],
                    move2: selectedMoves[1],
                    move3: selectedMoves[2],
                    move4: selectedMoves[3],
                  },
                  {
                    name: selectedItem,
                  }
                );
                setPokemonNumber(pokemonNumber + 1);
              }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                if (selectedMoves.length > 0) {
                  TeamData.addPokemon(
                    pokemonNumber,
                    pokemon,
                    imageUrl,
                    {
                      move1: selectedMoves[0],
                      move2: selectedMoves[1],
                      move3: selectedMoves[2],
                      move4: selectedMoves[3],
                    },
                    {
                      name: selectedItem,
                    }
                  );
                  TeamData.saveteam();
                  navigate("/");
                }
              }}
            >
              Done
            </button>
          )}
        </div>

        {selectedMoves.map((move) => {
          return (
            <p
              onClick={() => {
                setSelectedMoves(
                  selectedMoves.filter((move1) => move1 !== move)
                );
              }}
            >
              {formatString(move)}
            </p>
          );
        })}
      </div>
    </main>
  );
}
