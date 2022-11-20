<template>
  <article class="bg-light">
    <h4 class="pt-2">Moves</h4>
    <pokemon-item-learning-method-picker :pokemon-color="pokemonColor"
                                         @learning-method-chosen="(method) => this.learningMethod = method"/>
    <div class="table-responsive ps-2 pe-2">
      <table class="table table-hover">
        <thead :class="`chip-${pokemonColor}`">
        <tr>
          <th v-html="learningMethod === 'level-up' ? 'Level' : '-'"></th>
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
        <template v-if="filteredMoves.length > 0">
          <pokemon-item-move v-for="(move, index) in filteredMoves"
                             :key="index"
                             :move="move"
                             :version="version"
                             :learning-method="learningMethod"/>
        </template>
        <template v-else>
          <tr>
            <td colspan="9" class="text-danger text-center">
              No moves learned by this method in the selected games found.
            </td>
          </tr>
        </template>
        <tr :class="`chip-${pokemonColor}`">
          <td colspan="9"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <pokemon-item-version-picker :pokemon-color="pokemonColor" @version-chosen="(version) => this.version = version"/>
  </article>
</template>

<script>
import PokemonItemMove from "@/components/PokemonItemMove";
import PokemonItemVersionPicker from "@/components/PokemonItemVersionPicker";
import PokemonItemLearningMethodPicker from "@/components/PokemonItemLearningMethodPicker";

export default {
  name: "PokemonItemMoves",
  components: {PokemonItemLearningMethodPicker, PokemonItemVersionPicker, PokemonItemMove},
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
  data() {
    return {
      filteredMoves: [],
      learningMethod: 'level-up',
      version: 'red-blue'
    }
  },
  mounted() {
    this.sortMoves();
  },
  methods: {
    sortMoves() {
      const tmp = [];

      JSON.parse(JSON.stringify(this.moves)).forEach((move) => {
        const found = move.version_group_details.filter((detail) =>
            detail.version_group.name === this.version && detail.move_learn_method.name === this.learningMethod
        );

        if (found.length) {
          move.version_group_details = found[0];
          tmp.push(move);
        }
      });

      this.filteredMoves = tmp;
    },
  },
  watch: {
    learningMethod() {
      this.sortMoves();
    },
    version() {
      this.sortMoves();
    }
  }
}
</script>

<style scoped>
table {
  font-size: 12px;
}
</style>