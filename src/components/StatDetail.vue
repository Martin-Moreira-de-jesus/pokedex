<template>
  <article class="bg-light d-flex flex-column h-100">
    <h4 class="pt-2">Stats</h4>
    <div class="row pt-2 pb-2" v-for="(stat, index) in pokemon.stats" :key="index">
      <label :for="stat.stat.name"
             class="col-4 fw-bolder d-flex justify-content-end p-2 text-capitalize"
             style="font-size: 12px;">
        {{ stat.stat.name.toString().replace('special-', 'Sp.') }}
      </label>
      <div class="progress h-100 col-7 p-0"
           style="height: 30px !important">
        <div class="progress-bar progress-bar-striped h-100"
             :class="pokemonColor"
             role="progressbar"
             style="height: 100% !important;"
             :style="progressBarStyle(stat.base_stat)"
             :aria-valuenow="stat.base_stat"
             aria-valuemin="0"
             :aria-valuemax="pokemon.highestStat">
          {{ stat.base_stat }}
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "StatDetail",
  props: {
    pokemon: {
      type: Object,
      required: true,
    }
  },
  methods: {
    progressBarStyle(baseStat) {
      const percentage = Math.round((baseStat / this.pokemon.highestStat) * 100);
      return `width: ${percentage}%`;
    },
  },
  computed: {
    pokemonColor() {
      return `chip-${this.pokemon.color}`;
    },
  }
}
</script>

<style scoped>

</style>