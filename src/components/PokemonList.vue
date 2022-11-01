<template>
  <section>
    <div class="bg-white container flex-fill d-flex flex-row flex-wrap justify-content-evenly">
      <pokemon-card v-for="pokemon in pokemons" :id="pokemon.id" :key="pokemon.id" :name="pokemon.name"
                    :sprite="pokemon.sprite" :types="pokemon.types"/>
      <p v-if="isSearch && pokemons.length === 0" class="mt-2">
        Oh oh... looks like what you're searching for doesn't exist
      </p>
      <button v-if="!isFull" class="btn btn-primary text-white" @click="getPokemons">LOAD MORE</button>
    </div>
  </section>
</template>

<script>
import PokemonCard from "@/components/PokemonCard";
import API from "@/services/api";

export default {
  data() {
    return {
      isSearch: false,
      searchCriteria: '',
      offset: 0,
      limit: 20,
      /** @var isFull true when all possibilites have been displayed used to make load more button disappear **/
      isFull: false,
      pokemons: [],
    }
  },
  methods: {
    async getPokemons() {
      let result;
      if (this.isSearch) {
        result = await API.searchPokemons(this.searchCriteria, this.offset, this.limit);
      } else {
        result = await API.getPokemons(this.offset, this.limit);
      }

      this.pokemons = this.pokemons.concat(result.pokemons);
      this.isFull = result.isLast;
      this.offset += this.limit;
    },
    changeStrategy(criteria) {
      this.isSearch = criteria !== '';
      this.searchCriteria = criteria;
      this.offset = 0;
      this.pokemons = [];
      this.isLast = false;
      this.getPokemons();
    }
  },
  mounted() {
    this.getPokemons();
  },
  name: 'App',
  components: {
    PokemonCard,
  },
}
</script>

<style scoped>

</style>
