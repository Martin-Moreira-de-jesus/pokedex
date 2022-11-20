<template>
  <tr>
    <td></td>
    <td class="text-capitalize text-start align-middle">{{ move.name.replace("-", " ") }}</td>
    <td class="align-middle"><pokemon-small-chip v-if="moveDetail.type.name" :type="moveDetail.type.name"/></td>
    <td class="align-middle"><pokemon-small-chip v-if="moveDetail.type.name" :type="moveDetail.damage_class.name"/></td>
    <td class="align-middle">{{ moveDetail.power ?? '-' }}</td>
    <td class="align-middle">{{ moveDetail.pp ?? '-' }}</td>
    <td class="align-middle">{{ moveDetail.accuracy ?? '-' }}</td>
    <td class="align-middle">{{ moveDetail.priority ?? '-' }}</td>
    <td class="text-uppercase align-middle">{{ moveDetail.generation.name?.replace('generation-', '') }}</td>
  </tr>
</template>

<script>
import {pokedex} from '@/services/api';
import PokemonSmallChip from "@/components/PokemonSmallChip";

export default {
  name: "PokemonItemMove",
  components: {PokemonSmallChip},
  props: {
    move: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      moveDetail: {
        accuracy: '',
        priority: '',
        generation: {},
        damage_class: {},
        type: {},
        pp: '',
        power: '',
      }
    }
  },
  methods: {
    async initMove() {
      this.moveDetail = await pokedex.getMove(this.move.name);
    }
  },
  mounted() {
    this.initMove();
  }
}
</script>

<style scoped>

</style>