<template>
  <pokemon-detail @force-update="componentId++"/>
</template>

<script>
import PokemonDetail from "@/components/PokemonItem";
export default {
  name: "AppPokedexEntry",
  components: {PokemonDetail},
  data() {
    return {
      componentId: 0,
    }
  }
}
</script>

<style scoped>

</style>