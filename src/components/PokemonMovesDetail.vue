<template>
  <article class="bg-light">
    <h4 class="pt-2">Moves</h4>
    <div class="table-responsive ps-2 pe-2">
      <table class="table">
        <thead :class="`chip-${pokemonColor}`">
        <tr>
          <th>Level</th>
          <th>Move</th>
          <th>Type</th>
          <th>Category</th>
          <th>Power</th>
          <th>PP</th>
          <th>Accuracy</th>
          <th>Priority</th>
          <th>Generation</th>
        </tr>
        </thead>
        <tbody>
        <pokemon-move v-for="(move, index) in moves" :key="index" :move="move.move"/>
        <tr :class="`chip-${pokemonColor}`">
          <td colspan="9"></td>
        </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>

<script>
import PokemonMove from "@/components/PokemonMove";
export default {
  name: "PokemonMovesDetail",
  components: {PokemonMove},
  props: {
    moves: {
      type: Array,
      required: true,
    },
    pokemonColor: {
      type: String,
      required: true,
    }
  },
}
</script>

<style scoped>
table {
  font-size: 12px;
}
</style>