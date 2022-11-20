<template>
  <search-bar @search="(criteria) => changeStrategy(criteria)"/>
  <div class="container" style="height: 20px; background-color:#616161;"></div>
  <pokedex-advanced-search-bar ref="searchBar" @advanced-search="(data) => changeStrategy('', data)"/>
  <div class="container main-bg-pokedex main-content" style="padding: 0 100px">
    <advanced-search-button @click="$refs.searchBar.updateVisibility()"/>
    <pokemon-list ref="pokemonList"/>
  </div>
</template>

<script>
import PokemonList from "@/components/PokedexPokemonList";
import SearchBar from "@/components/PokedexSearchBar";
import PokedexAdvancedSearchBar from "@/components/PokedexAdvancedSearchBar";
import AdvancedSearchButton from "@/components/PokedexAdvancedSearchButton";

export default {
  name: 'App',
  components: {
    AdvancedSearchButton,
    PokedexAdvancedSearchBar,
    PokemonList,
    SearchBar,
  },
  methods: {
    changeStrategy(criteria, data) {
      this.$refs.pokemonList.changeStrategy(criteria, data);
    },
  }
}
</script>

<style>
.main-content {
  min-height: 70vh;
}
</style>
