<template>
  <div class="d-flex justify-content-center flex-wrap">
    <pokemon-large-chip
        v-for="(version, index) in versions.results"
        :key="index"
        :class-name="pokemonColor" :content="computeVersionName(version.name)"
        class="m-2"
        @click="$emit('version-chosen', version.name)"/>
  </div>
</template>

<script>
import {pokedex} from "@/services/api";
import PokemonLargeChip from "@/components/PokemonLargeChip";

export default {
  name: "PokemonItemVersionPicker",
  emits: ['version-chosen'],
  components: {PokemonLargeChip},
  props: {
    pokemonColor: {
      pokemonColor: String,
      required: true,
    }
  },
  data() {
    return {
      versions: [],
    }
  },
  methods: {
    async initVersions() {
      try {
        this.versions = await pokedex.getVersionGroups();
      } catch (e) {
        console.log(e);
        alert("Something went wrong");
      }
    },
    computeVersionName(name) {
      let tmp = '';
      tmp += name[0].toUpperCase();

      let found = name.indexOf('-');

      while (found >= 0) {
        tmp += name[found + 1].toUpperCase();
        name = name.slice(found + 1);
        found = name.indexOf('-');
      }

      return tmp;
    }
  },
  mounted() {
    this.initVersions();
  }
}
</script>

<style scoped>

</style>