<template>
  <search-bar @search="(criteria) => changeStrategy(criteria)"/>
  <div class="container" style="height: 20px; background-color:#616161;"></div>
  <advanced-search-bar ref="searchBar" @advanced-search="(data) => changeStrategy('', data)"/>
  <div class="container list-bg-pokedex" style="padding: 0 100px">
    <advanced-search-button @click="$refs.searchBar.updateVisibility()"/>
    <pokemon-list ref="pokemonList"/>
  </div>
</template>

<script>
import PokemonList from "@/components/PokemonList";
import SearchBar from "@/components/SearchBar";
import AdvancedSearchBar from "@/components/AdvancedSearchBar";
import AdvancedSearchButton from "@/components/AdvancedSearchButton";

export default {
  name: 'App',
  components: {
    AdvancedSearchButton,
    AdvancedSearchBar,
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
