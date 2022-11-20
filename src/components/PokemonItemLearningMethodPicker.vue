<template>
  <div class="d-flex justify-content-center flex-wrap">
    <pokemon-large-chip
        v-for="(learningMethod, index) in learningMethods"
        :key="index"
        :class-name="pokemonColor" :content="learningMethod"
        class="m-2"
        @click="$emit('learning-method-chosen', learningMethod)"/>
  </div>
</template>

<script>
import PokemonLargeChip from "@/components/PokemonLargeChip";

export default {
  name: "PokemonItemLearningMethodPicker",
  emits: ['learning-method-chosen'],
  components: {PokemonLargeChip},
  props: {
    pokemonColor: {
      pokemonColor: String,
      required: true,
    }
  },
  data() {
    return {
      learningMethods: ['level-up', 'machine', 'egg', 'tutor'],
    }
  },
}
</script>

<style scoped>

</style>