import React from "react";
import Authenticator from "../../utils/Authentication";
import TeamData from "../../utils/teamData";
import { useNavigate } from "react-router";
import itemsList from "../data/itemsList.js";
import "./teamBuilder.css";

export default function TeamBuilder() {
  //pokemon search
  const [search, setSearch] = React.useState("");
  //pokemon data
  const [imageUrl, setImageUrl] = React.useState("");
  const [pokemon, setPokemon] = React.useState("pikachu");
  //all pokemon moves
  const [moves, setMoves] = React.useState([]);
  const [selectedMove, setSelectedMove] = React.useState("");
  const [selectedMoves, setSelectedMoves] = React.useState([]);
  //pokemon moves description
  const [moveData, setMoveData] = React.useState({});
  //all pokemon items
  const [selectedItem, setSelectedItem] = React.useState("");

  const [pokemonNumber, setPokemonNumber] = React.useState(0);

  const [someting, setsometing] = React.useState(false);

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
          });
        });
    }
  }, [selectedMove]);

  // React.useEffect(() => {
  //   TeamData.loadPokemon(pokemonNumber);
  // }, [pokemonNumber]);

  return (
    <main>
      <div>
        <div id="searchInput">
          <input
            name="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
          <button onClick={() => setPokemon(search.toLowerCase())}>
            Search
          </button>
        </div>
        <img name="pokemonImg" src={imageUrl} alt="" />
        <div className="movesAndDescription">
          <ul className="moves">
            {moves.map((move) => {
              return (
                <li
                  key={move.move.name}
                  onClick={(e) => {
                    if (!selectedMoves.includes(move.move.name)) {
                      if (selectedMoves.length < 4) {
                        setSelectedMove(move.move.name);
                        setSelectedMoves(selectedMoves.concat(move.move.name));
                        setsometing(false);
                      } else alert("Please select only 4 moves");
                    } else {
                      setSelectedMove(move.move.name);
                      setsometing(true);
                      setSelectedMoves(
                        selectedMoves.filter(
                          (move1) => move1 !== move.move.name
                        )
                      );
                    }
                  }}
                >
                  {move.move.name}
                </li>
              );
            })}
          </ul>
          <div className="description">
            <h1 className="moveName">{selectedMove}</h1>
            <p className="moveDescription">{moveData.description}</p>
            {moveData.pp ? (
              <span className="movePP">PP:{moveData.pp}</span>
            ) : null}
            {moveData.accuracy ? (
              <span className="moveAccuracy">ACC:{moveData.accuracy}</span>
            ) : null}
            {moveData.power ? (
              <span className="movePower">PWR:{moveData.power}</span>
            ) : null}
            <span className="moveType">{moveData.type}</span>
            <span className="moveDamageClass">{moveData.damageClass}</span>
          </div>
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
          <div className="description">
            <h1 className="itemName">{selectedItem.name}</h1>
            {selectedItem ? (
              <p className="itemDescription">
                {selectedItem.entry[0].short_effect}
              </p>
            ) : null}
          </div>
        </div>
        {TeamData.pokemonNumber < 6 ? (
          <button
            onClick={() => {
              TeamData.addPokemon(pokemon, selectedMoves, selectedItem);
              TeamData.incrementPokemonNumber();
              setPokemonNumber(TeamData.pokemonNumber);
            }}
          >
            {" "}
            Next{" "}
          </button>
        ) : (
          <button> Done </button>
        )}
        {TeamData.pokemonNumber > 1 ? (
          <button
            onClick={() => {
              TeamData.decrementPokemonNumber();
              setPokemonNumber(TeamData.pokemonNumber);
            }}
          >
            Previous
          </button>
        ) : (
          <button onClick={() => navigate("home")}> Back </button>
        )}
      </div>
    </main>
  );
}
