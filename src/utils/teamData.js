import htmlEncodingSniffer from "html-encoding-sniffer";
import { getUser } from "./Authentication";

const URL = "http://localhost:4001";
export const addPokemon = (
  id,
  pokemon,
  pokemonImage,
  selectedMoves,
  selectedItem
) => {
  localStorage.setItem(
    "Pokemon " + id,
    JSON.stringify({
      ["pokemon" + id]: {
        name: pokemon,
        sprite: pokemonImage,
        moves: selectedMoves,
        item: selectedItem,
      },
    })
  );
};

export const saveteam = () => {
  let team = [];
  for (let i = 1; i <= 6; i++) {
    if (isPokemonExists(i)) {
      team.push(getPokemonData(i));
      // localStorage.removeItem("Pokemon " + i);
    }
  }
  const id = getUser(window.localStorage.getItem("access_token")).then(
    (data) => {
      console.log(data[0].id);
      return data[0].id;
    }
  );
  console.log("id" + id);
  console.log("team" + team);
  fetch(`http://localhost:4001/team/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      team: { ...team },
    }),
  })
    .then((response) => {
      return response.json;
    })
    .then((data) => {
      console.log("data : " + data);
    });
};

export const getPokemonData = (pokemonNum) => {
  return JSON.parse(localStorage.getItem("Pokemon " + pokemonNum));
};

export const isPokemonExists = (pokemonNum) => {
  return !!localStorage.getItem("Pokemon " + pokemonNum);
};
export const addPokemonToTeam = () => {};

export default {
  addPokemon,
  getPokemonData,
  isPokemonExists,
  saveteam,
};
