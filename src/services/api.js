import {Pokedex} from "pokeapi-js-wrapper";
import Criteria from "@/services/advanced-search";

const pokedex = new Pokedex();

export default {
    getPokemons: async (offset, limit) => {
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
    },
    searchPokemons: async (criteria, offset, limit) => {
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
    },
    getGenerations: async () => {
        const response = await pokedex.getGenerations();
        return response.results;
    },
    searchPokemonsAdvanced: async (criteria, offset, limit) => {
        let pokemons;
        if (offset === 0) {
            localStorage.removeItem('search-results');
            const {results} = await pokedex.getPokemonsList();
            const promises = [];
            for (let i = criteria.get("range-lowest") - 1; i < criteria.get("range-highest"); i++) {
                promises.push(pokedex.getPokemonByName(results[i].name));
            }
            const allPokemons = await Promise.all(promises);
            pokemons = Criteria.applyTypes(criteria, allPokemons);
            pokemons = Criteria.applyHeight(criteria, pokemons);
            pokemons = Criteria.applyWeight(criteria, pokemons);
            pokemons = await Criteria.applyGeneration(criteria, pokemons, pokedex);

            pokemons = pokemons.map((element) => {
                return {
                    id: parseInt(element.id),
                    name: element.name,
                    sprite: element.sprites.other["official-artwork"].front_default,
                    types: element.types,
                };
            });
        } else {
            pokemons = JSON.parse(localStorage.getItem('search-results'));
        }

        const isLast = limit > pokemons.length;
        const result = [];
        for (let i = 0; i < limit && pokemons.length > 0; i++) {
            result.push(pokemons.shift());
        }

        if (isLast) {
            localStorage.removeItem('search-results');
        } else {
            localStorage.setItem('search-results', JSON.stringify(pokemons));
        }

        return {
            pokemons: result,
            isLast: isLast,
        }
    },
};
