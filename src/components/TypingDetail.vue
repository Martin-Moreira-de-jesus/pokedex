<template>
  <article class="bg-light">
    <h4 class="pt-2">Typing</h4>
    <div class="d-flex justify-content-center text-small" style="font-size: 12px;">
      <table class="w-100 h-100 row justify-content-center p-3">
        <tr class="row pb-3 pt-3 border-bottom border-dark">
          <td class="col-2 d-flex align-items-center justify-content-end">0x</td>
          <td class="col-10 d-flex flex-row justify-content-center">
            <pokemon-small-chip v-for="(type, index) in noDamageFrom"
                                :key="index" :type="type.name" />
          </td>
        </tr>
        <tr class="row pb-3 pt-3 border-bottom border-dark">
          <td class="col-2 d-flex align-items-center justify-content-end">0.25x</td>
          <td class="col-10 d-flex flex-row justify-content-center">
            <pokemon-small-chip v-for="(type, index) in quarterDamageFrom"
                                :key="index" :type="type.name" />
          </td>
        </tr>
        <tr class="row pb-3 pt-3 border-bottom border-dark">
          <td class="col-2 d-flex align-items-center justify-content-end">0.5x</td>
          <td class="col-10 d-flex flex-row justify-content-center">
            <pokemon-small-chip v-for="(type, index) in halfDamageFrom"
                                :key="index" :type="type.name" />
          </td>
        </tr>
        <tr class="row pb-3 pt-3 border-bottom border-dark">
          <td class="col-2 d-flex align-items-center justify-content-end">2x</td>
          <td class="col-10 d-flex flex-row justify-content-center">
            <pokemon-small-chip v-for="(type, index) in doubleDamageFrom"
                                :key="index" :type="type.name" />
          </td>
        </tr>
        <tr class="row pb-3 pt-3 border-bottom border-dark">
          <td class="col-2 d-flex align-items-center justify-content-end">4x</td>
          <td class="col-10 d-flex flex-row justify-content-center">
            <pokemon-small-chip v-for="(type, index) in quadrupleDamageFrom"
                 :key="index" :type="type.name" />
          </td>
        </tr>
      </table>
    </div>
  </article>
</template>

<script>

import PokemonSmallChip from "@/components/PokemonSmallChip";
export default {
  name: "TypingDetail",
  components: {PokemonSmallChip},
  data() {
    return {
      noDamageFrom: [],
      quarterDamageFrom: [],
      halfDamageFrom: [],
      doubleDamageFrom: [],
      quadrupleDamageFrom: [],
    }
  },
  props: {
    pokemonTypes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    computeTyping() {
      const noDamageFrom = this.pokemonTypes.map((type) => type.damage_relations.no_damage_from).flat();
      const halfDamageFrom = this.pokemonTypes.map((type) => type.damage_relations.half_damage_from).flat();
      const doubleDamageFrom = this.pokemonTypes.map((type) => type.damage_relations.double_damage_from).flat();
      noDamageFrom.forEach((e) => e['multiplier'] = 0);
      halfDamageFrom.forEach((e) => e['multiplier'] = 1/2);
      doubleDamageFrom.forEach((e) => e['multiplier'] = 2);

      const allRelations = this.computeTypingMultipliers(noDamageFrom.concat(halfDamageFrom, doubleDamageFrom));

      this.noDamageFrom = allRelations.filter((element) => element.multiplier === 0);
      this.quarterDamageFrom = allRelations.filter((element) => element.multiplier === 1/4);
      this.halfDamageFrom = allRelations.filter((element) => element.multiplier === 1/2);
      this.doubleDamageFrom = allRelations.filter((element) => element.multiplier === 2);
      this.quadrupleDamageFrom = allRelations.filter((element) => element.multiplier === 4);
    },
    computeTypingMultipliers(arr) {
      let copy = arr.slice();
      const tmp = {};
      for (const element of arr) {
        const otherElement = tmp[element.name];
        if (otherElement) {
          copy = copy.filter((type) => type.name !== element.name);
          element.multiplier *= otherElement.multiplier;
          copy.push(element);
        } else {
          tmp[element.name] = element;
        }
      }
      return copy;
    }
  },
  mounted() {
    this.computeTyping();
  }
}
</script>

<style scoped>

</style>