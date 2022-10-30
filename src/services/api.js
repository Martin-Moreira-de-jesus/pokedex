import { Pokedex } from "pokeapi-js-wrapper";

const pokedex = new Pokedex();

export default {
  getPokemons: async (offset, limit) => {
    return pokedex
      .getPokemonsList({ offset: offset, limit: limit })
      .then((response) => {
        const promises = response.results.map((element) =>
          pokedex.getPokemonByName(element.name)
        );

        return Promise.all(promises);
      })
      .then((data) => {
        return data.map((element) => {
          return {
            id: parseInt(element.id),
            name: element.name,
            sprite: element.sprites.other["official-artwork"].front_default,
            types: element.types,
          };
        });
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
      });
  },
};
