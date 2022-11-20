<template>
  <div :style="{'grid-area': 'arrow-' + position}" class="d-flex justify-content-center flex-column align-items-center">
    <img src="../assets/images/right-arrow.png" alt="fleche" :style="{'transform': `rotate(${rotation}deg)`}">
  </div>
</template>

<script>
export default {
  name: "PokemonItemEvolutionArrow",
  props: {
    position: {
      type: String,
      required: false,
    },
    rotation: {
      type: Number,
      required: false,
      default: 0,
    }
  },
}
</script>

<style scoped>
img {
  width: 48px;
  height: 48px;
}
</style>
