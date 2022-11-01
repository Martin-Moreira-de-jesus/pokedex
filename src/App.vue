<template>
  <app-header/>
  <main>
    <search-bar @search="(criteria) => changeStrategy(criteria)"/>
    <div class="container list-bg-pokedex" style="padding: 0 100px">
      <pokemon-list ref="pokemonList"/>
    </div>
  </main>
</template>

<script>
import PokemonList from "@/components/PokemonList";
import AppHeader from "@/components/AppHeader";
import SearchBar from "@/components/SearchBar";

export default {
  name: 'App',
  components: {
    AppHeader,
    PokemonList,
    SearchBar
  },
  methods: {
    changeStrategy(criteria) {
      this.$refs.pokemonList.changeStrategy(criteria);
    }
  }
}
</script>

<style>
#app {
  font-family: Pokemon-gb, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  background: url("assets/bg-main.png");
}

.list-bg-pokedex {
  background: url("assets/bg-pokedex.png") white;
}

</style>
