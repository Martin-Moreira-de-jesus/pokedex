import { Pokedex } from "pokeapi-js-wrapper";

const pokedex = new Pokedex();

export default {
  getPokemons: async (offset, limit) => {
    try {
      const response = await pokedex.getPokemonsList({
        offset: offset,
        limit: limit,
      });

      const isLast = !response.next;

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

      return {
        pokemons: pokemons,
        isLast: isLast,
      };
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  },
  searchPokemons: async (criteria, offset, limit) => {
    try {
      const response = await pokedex.getPokemonsList();

      const regex = new RegExp(`.*${criteria}.*`, "i");

      const matches = response.results.filter(
        (result) =>
          result.name.match(regex) ||
          result.url
            .substr(result.url.indexOf("pokemon/"), result.url.length - 1)
            .match(regex)
      );

      const isLast = matches.length <= offset + limit;

      const promises = [];
      for (let i = offset; i < offset + limit && i < matches.length; i++) {
        promises.push(pokedex.getPokemonByName(matches[i].name));
      }

      const data = await Promise.all(promises);

      const pokemons = data.map((element) => {
        return {
          id: parseInt(element.id),
          name: element.name,
          sprite: element.sprites.other["official-artwork"].front_default,
          types: element.types,
        };
      });

      return {
        pokemons: pokemons,
        isLast: isLast,
      };
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  },
};
