let pokemonNumber = 0;
let TOKEN_KEY = "Pokemon " + pokemonNumber;

export const addPokemon = (pokemon, selectedMoves, selectedItem) => {
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({
      pokemon: pokemon,
      moves: selectedMoves,
      item: selectedItem,
    })
  );
};

export const incrementPokemonNumber = () => {
  pokemonNumber++;
};

export const decrementPokemonNumber = () => {
  pokemonNumber--;
};

export default {
  addPokemon,
  incrementPokemonNumber,
  decrementPokemonNumber,
  pokemonNumber,
};
