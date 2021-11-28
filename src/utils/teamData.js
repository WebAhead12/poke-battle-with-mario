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
      pokemon: { name: pokemon, sprite: pokemonImage },
      moves: selectedMoves,
      item: selectedItem,
    })
  );
};

export const getPokemonData = (pokemonNum) => {
  return JSON.parse(localStorage.getItem("Pokemon " + pokemonNum));
};

export const isPokemonExists = (pokemonNum) => {
  return !!localStorage.getItem("Pokemon " + pokemonNum);
};

export const deleteAllPokemons = () => {
  for (let i = 1; i < 6; i++) {
    if (isPokemonExists(i)) localStorage.removeItem("Pokemon " + i);
  }
};

export const deletePokemon = (pokemonNum) => {
  if (isPokemonExists(pokemonNum))
    localStorage.removeItem("Pokemon " + pokemonNum);
};

export default {
  addPokemon,
  getPokemonData,
  isPokemonExists,
  deletePokemon,
  deleteAllPokemons,
};
