const Criteria = {
    applyTypes: (criteria, pokemons) => {
        let matches = Array.from(criteria.keys()).filter((key) => {
            const regex = new RegExp(/type-.*/);
            return key.match(regex);
        }).map((match) => match.replace('type-', ''));

        if (matches.length > 0) {
            if (matches.length > 2) return [];
            return pokemons.filter((pokemon) => {
                const types = pokemon.types.map((type) => type.type.name);
                if (matches.length === 2) {
                    return JSON.stringify(types.sort()) === JSON.stringify(matches.sort());
                } else {
                    return matches.some((match) => types.includes(match));
                }
            });
        }

        return pokemons;
    },
    applyHeight: (criteria, allPokemons) => {
        const matches = Array.from(criteria.keys()).filter((element) => element.match(new RegExp('/height-.*/')));
        if (matches.length === 0 || matches.length === 3) return allPokemons;
        return allPokemons.filter((pokemon) => {
            const height = pokemon.height / 10; // h in meters

            let result = false;

            if (criteria.has("height-small") && height <= 1.2) {
                result = true;
            }

            if (criteria.has("height-medium") && height > 1.2 && height <= 2.1) {
                result = true;
            }

            if (criteria.has("height-large") && height > 2.1) {
                result = true;
            }

            return result;
        });
    },
    applyWeight: (criteria, allPokemons) => {
        const matches = Array.from(criteria.keys()).filter((element) => element.match(new RegExp('/weight-.*/')));
        if (matches.length === 0 || matches.length === 3) return allPokemons;
        return allPokemons.filter((pokemon) => {
            const weight = pokemon.weight / 10; // w in kg

            let result = false;

            if (criteria.has("weight-small") && weight < 20) {
                result = true;
            }

            if (criteria.has("weight-medium") && weight >= 20 && weight < 100) {
                result = true;
            }

            if (criteria.has("weight-large") && weight >= 100) {
                result = true;
            }

            return result;
        });
    },
    applyGeneration: async (criteria, allPokemons, pokedex) => {
        if (criteria.get("generation") === '') return allPokemons;
        const {pokemon_species} = await pokedex.getGeneration(criteria.get("generation"));
        return allPokemons.filter((pokemon) => pokemon_species.some((specie) => specie.name === pokemon.name));
    },
};

export default Criteria;
