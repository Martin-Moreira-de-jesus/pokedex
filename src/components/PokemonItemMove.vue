<template>
  <tr>
    <td class="align-middle text-uppercase" v-html="identifier"></td>
    <td class="text-capitalize text-start align-middle">{{ move.move.name.replace("-", " ") }}</td>
    <td class="align-middle">
      <pokemon-small-chip v-if="moveDetail.type.name" :type="moveDetail.type.name"/>
    </td>
    <td class="align-middle">
      <pokemon-small-chip v-if="moveDetail.type.name" :type="moveDetail.damage_class.name"/>
    </td>
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
import {extractIdFromUrl} from "@/services/utils";

export default {
  name: "PokemonItemMove",
  components: {PokemonSmallChip},
  props: {
    move: {
      type: Object,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    learningMethod: {
      type: String,
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
        machineName: '',
      }
    }
  },
  methods: {
    async initMove() {
      try {
        const tmp = await pokedex.getMove(this.move.move.name);

        if (this.learningMethod === 'machine') {
          const found = tmp.machines.filter((element) => element.version_group.name === this.version);

          if (found.length) {
            tmp.machineName = (await pokedex.getMachine(extractIdFromUrl(found[0].machine.url))).item.name
          }
        }

        this.moveDetail = tmp;
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }
    }
  },
  mounted() {
    this.initMove();
  },
  computed: {
    identifier() {
      if (this.learningMethod === 'level-up') return this.move.version_group_details.level_learned_at;
      if (this.learningMethod === 'machine') return this.moveDetail.machineName;
      return '-';
    }
  }
}
</script>

<style scoped>

</style>