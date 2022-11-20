export function extractIdFromUrl(url) {
    if (!Number.isNaN(parseInt(url))) return url;
    url = url.substring(0, url.length - 1);
    return parseInt(url.substring(url.lastIndexOf('/') + 1));
}

export function sortByNameDesc(a, b) {
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
}

export function sortByNameAsc(a, b) {
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

export function mapPokemon(element) {
    element.sprite = element.sprites.other["official-artwork"].front_default ?? element.sprites.front_default
    return element;
}