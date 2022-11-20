<template>
  <app-header/>
  <main>
    <router-view :key="$route.fullPath"/>
  </main>
  <app-footer />
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

export default {
  name: 'App',
  components: {
    AppFooter,
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

.main-bg-pokedex {
  background: url("assets/bg-pokedex.png") white;
}
</style>
