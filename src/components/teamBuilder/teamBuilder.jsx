import React from "react";
import Authenticator from "../../utils/Authentication";
import { useNavigate } from "react-router";
// import useFetch from "react-fetch-hook";
import "./teamBuilder.css";

export default function TeamBuilder() {
  //pokemon search
  const [search, setSearch] = React.useState("");
  //pokemon data
  const [imageUrl, setImageUrl] = React.useState("");
  const [pokemon, setPokemon] = React.useState("");
  //all pokemon moves
  const [moves, setMoves] = React.useState([]);
  const [selectedMove, setSelectedMove] = React.useState("");
  //pokemon moves description
  const [moveData, setMoveData] = React.useState({});

  const navigate = useNavigate();

  // const {
  //   isLoading: ArePokemonsLoading,
  //   data: allPokemons,
  //   error: pokemonsError,
  // } = useFetch("https://pokeapi.co/api/v2/pokemon/?limit=1200");

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
                  onClick={() => setSelectedMove(move.move.name)}
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
        <div className="items"></div>
      </div>
    </main>
  );
}
