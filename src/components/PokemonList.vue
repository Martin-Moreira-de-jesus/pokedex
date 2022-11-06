<template>
  <section>
    <div class="bg-white container flex-fill d-flex flex-row flex-wrap justify-content-evenly">
      <pokemon-card v-for="pokemon in pokemons" :id="pokemon.id" :key="pokemon.id" :name="pokemon.name"
                    :sprite="pokemon.sprite" :types="pokemon.types"/>
      <p v-if="strategy !== 'list' && pokemons.length === 0" class="mt-2">
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
      strategy: 'list',
      searchCriteria: '',
      advancedSearchCriteria: '',
      offset: 0,
      limit: 20,
      /** @var isFull true when all possibilites have been displayed used to make load more button disappear **/
      isFull: false,
      pokemons: [],
    }
  },
  methods: {
    async getPokemons() {
      try {
        let result;
        switch (this.strategy) {
          case 'search':
            result = await API.searchPokemons(this.searchCriteria, this.offset, this.limit);
            break;
          case 'list':
            result = await API.getPokemons(this.offset, this.limit);
            break;
          case 'advanced-search':
            result = await API.searchPokemonsAdvanced(this.advancedSearchCriteria, this.offset, this.limit);
            break;
        }

        this.pokemons = this.pokemons.concat(result.pokemons);
        this.isFull = result.isLast;
        this.offset += this.limit;
      } catch (err) {
        alert("Something went wrong, refresh the page and try again");
        this.pokemons = [];
        this.isFull = true;
        this.offset = 0;
      }
    },
    changeStrategy(criteria, data = undefined) {
      if (data) {
        this.advancedSearchCriteria = data;
        this.strategy = 'advanced-search';
      } else {
        if (criteria === '') {
          this.strategy = 'list';
        } else {
          this.strategy = 'search';
        }
      }

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
