<template>
  <header class="navbar navbar-light bg-light d-flex justify-content-center">
    <router-link :to="{name: 'pokedex'}" class="navbar-brand">
      <img src="../assets/pokemon-logo.svg" class="navbar-brand" alt="brand logo" height="900" width="1600">
    </router-link>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
}
</script>

<style scoped>
img {
  display: block;
  max-width: 230px;
  max-height: 95px;
  width: auto;
  height: auto;
}
</style>
