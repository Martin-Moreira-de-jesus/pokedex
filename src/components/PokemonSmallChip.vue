<template>
  <img :src="imagePath(type)"
       :alt="`no damage from ${type}`"
       class="type-chip"
       :class="`chip-${type} type-chip-${type}`">
</template>

<script>
export default {
  name: "PokemonSmallChip",
  props: {
    type: {
      type: String,
      required: true
    },
  },
  methods: {
    imagePath(typeName) {
      return require(`@/assets/images/types/${typeName}.png`)
    },
  }
}
</script>

<style scoped>
img {
  height: 2.5rem;
  width: 2.5rem;
}
</style>
