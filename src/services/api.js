import { Pokedex } from "pokeapi-js-wrapper";

const pokedex = new Pokedex();

export default {
  getPokemons: async (offset, limit) => {
    try {
      const response = await pokedex.getPokemonsList({
        offset: offset,
        limit: limit,
      });

      const promises = response.results.map((element) =>
        pokedex.getPokemonByName(element.name)
      );

      const data = await Promise.all(promises);

      const pokemons = data.map((element) => {
        return {
          id: parseInt(element.id),
          name: element.name,
          sprite: element.sprites.other["official-artwork"].front_default,
          types: element.types,
        };
      });

      return pokemons;
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  },
};
