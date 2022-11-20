<template>
  <img :src="imageLoading ? pokemon.sprite : require('@/assets/images/pokeball.png')"
       :alt="`${pokemon?.name}'s sprite`"
       class="w-auto"
       style="max-width: 100%; min-width: 100%;"
       @load="imageLoaded = true">
</template>

<script>
export default {
  name: "PokemonItemForm",
  props: {
    pokemon: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      imageLoaded: false,
    }
  },
  computed: {
    imageLoading() {
      return this.imageLoaded && !!this.pokemon.sprite;
    }
  }
}
</script>

<style scoped>

</style>