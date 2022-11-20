<template>
  <pokedex-sort-options @sort="onSort" />
  <section>
    <div class="bg-white container flex-fill d-flex flex-row flex-wrap justify-content-evenly">
      <pokemon-card v-for="pokemon in pokemons" :id="pokemon.id" :key="pokemon.id" :name="pokemon.name"
                    :sprite="pokemon.sprite" :types="pokemon.types"/>
      <div v-if="strategy !== 'list' && pokemons.length === 0 && !isLoading" class="mt-2 p-2 not-found">
        <p>
          Oh oh...<br>
          Looks no Pokémon matched your search!
        </p>
        <img :src="require('@/assets/images/sad-pikachu.webp')" alt="no pokemon found image" style="width: 200px; height:200px;">
        <p>You could try being less specific</p>
      </div>
    </div>
    <Vue3Lottie :animationData="Loader"
                :height="50"
                :width="50"
                v-if="isLoading" />
    <button v-if="!isFull && !isLoading" class="btn btn-primary text-white" @click="getPokemons">LOAD MORE</button>
  </section>
</template>

<script>
import PokemonCard from "@/components/PokemonCard";
import API from "@/services/api";
import {Vue3Lottie} from 'vue3-lottie';
import Loader from '@/assets/lotties/loader.json'
import 'vue3-lottie/dist/style.css'
import PokedexSortOptions from "@/components/PokedexSortOptions";

export default {
  name: "PokedexPokemonList",
  data() {
    return {
      strategy: 'list',
      searchCriteria: '',
      advancedSearchCriteria: '',
      offset: 0,
      limit: 20,
      /** @var isFull true when all possibilites have been displayed used to make load more button disappear **/
      isFull: false,
      isLoading: false,
      pokemons: [],
      Loader,
      orderBy: 1,
    }
  },
  methods: {
    async getPokemons() {
      try {
        this.isLoading = true;
        let result;
        switch (this.strategy) {
          case 'search':
            result = await API.searchPokemons(this.searchCriteria, this.offset, this.limit, this.orderBy);
            break;
          case 'list':
            result = await API.getPokemons(this.offset, this.limit, this.orderBy);
            break;
          case 'advanced-search':
            result = await API.searchPokemonsAdvanced(this.advancedSearchCriteria, this.offset, this.limit, this.orderBy);
            break;
        }

        this.pokemons = this.pokemons.concat(result.pokemons);
        this.isFull = result.isLast;
        this.offset += this.limit;
        this.isLoading = false;
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
    },
    onSort(sortBy) {
      this.pokemons = [];
      this.offset = 0;
      this.orderBy = sortBy;
      this.getPokemons();
    }
  },
  mounted() {
    this.getPokemons();
  },
  components: {
    PokedexSortOptions,
    PokemonCard,
    Vue3Lottie,
  },
}
</script>

<style scoped>
.not-found {
  border: red 2px solid;
  border-radius: 5px;
}
</style>
