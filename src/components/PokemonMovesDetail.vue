<template>
  <article class="bg-light">
    <h4 class="pt-2">Moves</h4>
    <div class="table-responsive ps-2 pe-2">
      <table class="table table-hover">
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
        <template v-if="moves.length > 0">
          <pokemon-move v-for="(move, index) in moves" :key="index" :move="move.move"/>
        </template>
        <template v-else>
          <tr>
            <td colspan="9" class="text-danger text-center">
              This pokemon doesn't learn any moves
            </td>
          </tr>
        </template>
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