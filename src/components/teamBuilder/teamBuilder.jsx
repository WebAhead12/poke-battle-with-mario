import React from "react";
import Authenticator from "../../utils/Authentication";
import TeamData from "../../utils/teamData";
import { useNavigate } from "react-router";
import itemsList from "../data/itemsList.js";
import "./teamBuilder.css";
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
      setPokemon(data.pokemon.name);
      setImageUrl(data.pokemon.sprite);
      setSelectedMoves(data.moves);
      setSelectedItem(data.item);
    } else {
      setPokemon("");
      setImageUrl("");
      setSelectedMoves([]);
      setSelectedItem("");
    }
  }, [pokemonNumber]);

  return (
    <main>
      <div>
        <span className="pokeNum">{pokemonNumber}</span>
        <div className="searchDiv">
          <div id="searchInput">
            <input
              name="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <button
              onClick={() => {
                if (TeamData.isPokemonExists(pokemonNumber)) {
                  setSelectedItem("");
                  setSelectedMoves([]);
                  setSelectedMove("");
                }
                setPokemon(search.toLowerCase());
              }}
            >
              Search
            </button>
          </div>
          <img name="pokemonImg" src={imageUrl} alt="" />
        </div>
        <div className="movesAndDescription">
          <ul className="moves">
            {moves.map((move) => {
              return (
                <li
                  className={classNames({
                    highlighted: selectedMoves.indexOf(move.move.name) != -1,
                  })}
                  key={move.move.name}
                  onClick={(e) => {
                    if (!selectedMoves.includes(move.move.name)) {
                      if (selectedMoves.length < 4) {
                        setSelectedMove(move.move.name);
                        setSelectedMoves(selectedMoves.concat(move.move.name));
                      } else alert("Please select only 4 moves");
                    } else {
                      setSelectedMove(move.move.name);
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
            <div className="description">
              <h1 className="moveName">{formatString(selectedMove)}</h1>
              <p className="moveDescription">
                {moveData.description
                  ? moveData.description.replace(
                      "$effect_chance",
                      moveData.effectChance
                    )
                  : null}
              </p>
              <div className="moveMisc">
                <div className="moveStats">
                  {moveData.pp ? (
                    <span className="movePP">PP:{moveData.pp}</span>
                  ) : null}
                  {moveData.accuracy ? (
                    <span className="moveAccuracy">
                      ACC:{moveData.accuracy}
                    </span>
                  ) : null}
                  {moveData.power ? (
                    <span className="movePower">PWR:{moveData.power}</span>
                  ) : null}
                </div>
                <div className="moveInfo">
                  <span className="moveType">Type: {moveData.type}</span>
                  <span className="moveDamageClass">
                    {moveData.damageClass}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="itemsAndDescription">
          <div className="items">
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
            <div className="description">
              <h1 className="itemName">{formatString(selectedItem.name)}</h1>
              <p className="itemDescription">
                {selectedItem.entry ? selectedItem.entry[0].short_effect : null}
              </p>
            </div>
          ) : null}
        </div>
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
                  name: selectedItem.name,
                  sprite: selectedItem.sprites.default,
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
              if (selectedMoves.length > 1) {
                TeamData.addPokemon(
                  pokemonNumber,
                  pokemon,
                  imageUrl,
                  selectedMoves,
                  selectedItem.name
                );
                TeamData.saveteam();
                navigate("/");
              }
            }}
          >
            Done
          </button>
        )}
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
