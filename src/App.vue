<template>
  <app-header/>
  <main>
    <router-view />
  </main>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  name: 'App',
  components: {
    AppHeader,
  },
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
