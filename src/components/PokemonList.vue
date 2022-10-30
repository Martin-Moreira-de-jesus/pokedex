<template>
  <section>
    <div class="bg-white container flex-fill d-flex flex-row flex-wrap justify-content-evenly">
      <pokemon-card v-for="(pokemon, index) in pokemons" :key="index"  :id="pokemon.id" :name="pokemon.name" :sprite="pokemon.sprite" :types="pokemon.types"/>
      <button class="btn btn-primary text-white" @click="getPokemons()">LOAD MORE</button>
    </div>
  </section>
</template>

<script>
import PokemonCard from "@/components/PokemonCard";
import { Pokedex } from "pokeapi-js-wrapper";

export default {
  data() {
    return {
      nextOffset: 0,
      limit: 20,
      pokemons: [],
      pokedex: new Pokedex(),
    }
  },
  methods: {
    getPokemons() {
      this.pokedex.getPokemonsList({offset: this.nextOffset, limit: this.limit})
          .then((response) => {
            const next = response.next;
            this.nextOffset =
                parseInt(next.slice(next.lastIndexOf("offset=") + 7, next.lastIndexOf('&')));
            return response.results;
          })
          .then((results) => {
            const promises = results.map(element =>
                this.pokedex.getPokemonByName(element.name))
            return Promise.all(promises);
          })
          .then((data) => {
            data.map((element) => {
              const pokemon = {
                id: parseInt(element.id),
                name: element.name,
                sprite: element.sprites.other['official-artwork'].front_default,
                types: element.types,
              }
              this.pokemons.push(pokemon);
            })
          })
          .catch((err) => {
            alert("Something went wrong");
            console.log(err);
          });
    }
  },
  mounted() {
    this.getPokemons();
  },
  name: 'App',
  components: {
    PokemonCard,
  }
}
</script>

<style scoped>

</style>
