<template>
  <section>
    <div class="bg-white container flex-fill d-flex flex-row flex-wrap justify-content-evenly">
      <pokemon-card v-for="pokemon in pokemons" :id="pokemon.id" :key="pokemon.id" :name="pokemon.name"
                    :sprite="pokemon.sprite" :types="pokemon.types"/>
      <button class="btn btn-primary text-white" @click="getPokemons()">LOAD MORE</button>
    </div>
  </section>
</template>

<script>
import PokemonCard from "@/components/PokemonCard";
import API from "@/services/api";

export default {
  data() {
    return {
      nextOffset: 0,
      limit: 20,
      pokemons: [],
    }
  },
  methods: {
    async getPokemons() {
      const result = await API.getPokemons(this.nextOffset, this.limit);
      this.pokemons = this.pokemons.concat(result);
      this.nextOffset += this.limit;
    },
  },
  mounted() {
    this.getPokemons();
  },
  name: 'App',
  components: {
    PokemonCard,
  },
  computed: {
    test() {
      return this.pokemons;
    }
  }
}
</script>

<style scoped>

</style>
