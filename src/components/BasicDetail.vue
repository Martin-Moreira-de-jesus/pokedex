<template>
  <article class="bg-light h-100">
    <h4 class="pt-2">Common Info</h4>
    <div class="d-flex flex-row">
      <div class="col-4 fw-bold d-flex justify-content-end p-2 " style="width: 30%; font-size: 12px;">Height</div>
      <div class="col-8  d-flex align-self-start p-2">{{ pokemon.height }}m</div>
    </div>

    <div class="row">
      <div class="col-4 fw-bold d-flex justify-content-end p-2" style="width: 30%; font-size: 12px;">Weight</div>
      <div class="col-8 d-flex align-self-start p-2">{{ pokemon.weight }}kg</div>
    </div>

    <div class="row">
      <div class="col-4 fw-bold d-flex justify-content-end p-2 align-items-center" style="width: 30%; font-size: 12px;">Abilities</div>
      <div class="col-8 d-flex align-self-start flex-wrap p-2">
        <pokemon-large-chip v-for="(ability, index) in pokemon.abilities"
                            :key="index"
                            class="me-1 mt-1 fit-content ps-1 pe-1"
                            :className="pokemon.color"
                            :content="ability.ability.name"/>
      </div>
    </div>

    <div class="row">
      <div class="col-4 fw-bold d-flex justify-content-end p-2 align-items-center" style="width: 30%; font-size: 12px;">Types</div>
      <div class="col-8  d-flex align-self-start flex-wrap p-2">
        <pokemon-large-chip v-for="(type, index) in pokemon.types"
                            :key="index"
                            class="me-1 mt-1"
                            :className="type.type.name"/>
      </div>
    </div>

    <div class="row">
      <div class="col-4 fw-bold d-flex justify-content-end align-items-center" style="width: 30%; font-size: 12px;">Forms</div>
      <div class="col-8  d-flex align-self-start flex-wrap p-2">
        <template v-if="species">
          <pokemon-large-chip v-for="(form, index) in species.varieties"
                              :key="index"
                              class="me-1 mt-1 fit-content ps-1 pe-1"
                              :className="pokemon.color"
                              :content="form.pokemon.name"
                              @click="$emit('form-chosen', form)"/>
        </template>
      </div>
    </div>
  </article>
</template>

<script>
import PokemonLargeChip from "@/components/PokemonLargeChip";
export default {
  name: "BasicDetail",
  components: {PokemonLargeChip},
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    species: {
      type: Object,
      required: true
    }
  },
  methods: {
    typeColor(type) {
      return `btn-${type}`;
    },
    async fetchForms() {

    }
  },
  mounted() {
    this.fetchForms();
  }
}
</script>

<style scoped>
.fit-content {
  width: fit-content;
}
</style>
