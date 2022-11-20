<template>
  <div class="container main-bg-pokedex">
    <article class="bg-light container pt-2">
      <h2>404</h2>
      <p>Oops, looks like we didn't find what you were looking for...</p>
      <router-link :to="{name: 'pokedex'}" class="d-block">Go home</router-link>
      <img :src="require('@/assets/images/404.png')" alt="404 not found">
    </article>
  </div>
</template>

<script>
export default {
  name: "AppNotFound"
}
</script>

<style scoped>
article {
  height: 80vh;
}
img {
  width: 250px;
  height: 250px;
}
</style>