import {Pokedex} from "pokeapi-js-wrapper";
import Criteria from "@/services/advanced-search";
import {LAST_POKEMON_ID} from "@/services/constants";

export const pokedex = new Pokedex();

function sortByNameDesc(a, b) {
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
}

function sortByNameAsc(a, b) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}

export function mapPokemons(raw) {
    return raw.map((element) => {
        return {
            id: parseInt(element.id),
            name: element.name,
            sprite: element.sprites.other["official-artwork"].front_default,
            types: element.types,
        };
    });
}

function applySort(orderBy, pokemons) {
    let result;
    switch (parseInt(orderBy)) {
        case 1:
            result = pokemons;
            break;
        case 2:
            result = pokemons.reverse();
            break;
        case 3:
            result = pokemons.sort(sortByNameAsc);
            break;
        case 4:
            result = pokemons.sort(sortByNameDesc);
            break;
    }
    return result;
}

export default {
    getPokemon: async (identifier) => {
        return await pokedex.getPokemonByName(identifier);
    },
    getPokemonSpecie: async (specie) => {
        return await pokedex.getPokemonSpeciesByName(specie);
    },
    getPokemons: async (offset, limit, orderBy = 1) => {
        let { results } = await pokedex.getPokemonsList({
            offset: 0,
            limit: LAST_POKEMON_ID
        });

        results = applySort(orderBy, results);

        const isLast = LAST_POKEMON_ID <= offset + limit;

        const promises = [];
        for (let i = offset; i < offset + limit && i < LAST_POKEMON_ID; i++) {
            promises.push(pokedex.getPokemonByName(results[i].name));
        }

        const data = await Promise.all(promises);

        const pokemons = mapPokemons(data);

        return {
            pokemons: pokemons,
            isLast: isLast,
        };
    },
    searchPokemons: async (criteria, offset, limit, orderBy = 1) => {
        const response = await pokedex.getPokemonsList({
            offset: 0,
            limit: LAST_POKEMON_ID,
        });

        const regex = new RegExp(`.*${criteria}.*`, "i");

        let matches = response.results.filter(
            (result) =>
                result.name.match(regex) ||
                result.url
                    .substr(result.url.indexOf("pokemon/"), result.url.length - 1)
                    .match(regex)
        );

        matches = applySort(orderBy, matches);

        const isLast = matches.length <= offset + limit;

        const promises = [];
        for (let i = offset; i < offset + limit && i < matches.length; i++) {
            promises.push(pokedex.getPokemonByName(matches[i].name));
        }

        const data = await Promise.all(promises);

        const pokemons = mapPokemons(data);

        return {
            pokemons: pokemons,
            isLast: isLast,
        };
    },
    getGenerations: async () => {
        const response = await pokedex.getGenerations();
        return response.results;
    },
    searchPokemonsAdvanced: async (criteria, offset, limit, orderBy = 1) => {
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

            pokemons = mapPokemons(pokemons);

            localStorage.setItem('search-results', JSON.stringify(pokemons));
        } else {
            pokemons = JSON.parse(localStorage.getItem('search-results'));
        }

        pokemons = applySort(orderBy, pokemons);

        const isLast = limit >= pokemons.length;
        const result = [];
        for (let i = offset; i < offset + limit && i < pokemons.length; i++) {
            result.push(pokemons[i]);
        }

        if (isLast) {
            localStorage.removeItem('search-results');
        }

        return {
            pokemons: result,
            isLast: isLast,
        }
    },
};
