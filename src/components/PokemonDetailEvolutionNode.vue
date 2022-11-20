<template>
  <div :style="{'grid-area': `card-${String(position)}` }">
    <pokemon-card
        :id="pokemon.id"
        :name="pokemon.name"
        :sprite="pokemon.sprite"
        :types="pokemon.types" />
  </div>

  <pokemon-detail-evolution-arrow v-if="evolutionChain.evolves_to.length === 1" :position="position"/>

  <div v-if="evolutionChain.evolves_to.length === 2"
       :style="{'grid-area': 'arrow-' + computePositionArrow(1, depth)}"
       class="d-flex justify-content-between flex-column">
    <pokemon-detail-evolution-arrow :rotation="-45"/>
    <pokemon-detail-evolution-arrow :rotation="45"/>
  </div>

  <div v-if="evolutionChain.evolves_to.length === 3"
       :style="{'grid-area': 'arrow-' + computePositionArrow(1, depth)}"
       class="d-flex justify-content-between flex-column">
    <pokemon-detail-evolution-arrow :rotation="-45"/>
    <pokemon-detail-evolution-arrow />
    <pokemon-detail-evolution-arrow :rotation="45"/>
  </div>

  <template v-if="evolutionChain.evolves_to.length < 8">
    <pokemon-detail-evolution-node v-for="(next, index) in evolutionChain.evolves_to"
                                   :key="index"
                                   :evolution-chain="next"
                                   :position="computePosition(evolutionChain.evolves_to.length, index, depth + 1)"
                                   :depth="depth + 1"/>
  </template>
  <template v-else>
    <pokemon-detail-evolution-node v-for="(pos, index) in ['0-0', '0-1', '0-2', '1-0', '1-2', '2-0', '2-1', '2-2']"
                                   :key="index"
                                   :evolution-chain="evolutionChain.evolves_to[index]"
                                   :position="pos"/>
    <pokemon-detail-evolution-arrow v-for="(element, index) in [{pos: '0-0', rotation: 225}, {pos: '0-1', rotation: 270},
                                                                {pos: '0-2', rotation: 315}, {pos: '1-0', rotation: 180},
                                                                {pos: '1-1', rotation: 0}, {pos: '2-0', rotation: 135},
                                                                {pos: '2-1', rotation: 90}, {pos: '2-2', rotation: 45}]"
                                    :position="element.pos"
                                    :rotation="element.rotation"
                                    :key="index"/>
  </template>
</template>

<script>
import {mapPokemon, pokedex} from "@/services/api";
import PokemonCard from "@/components/PokemonCard";
import PokemonDetailEvolutionArrow from "@/components/PokemonDetailEvolutionArrow";
import {extractIdFromUrl} from "@/services/utils";

export default {
  name: "PokemonDetailEvolutionNode",
  components: {PokemonDetailEvolutionArrow, PokemonCard},
  props: {
    evolutionChain: {
      type: Object,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    depth: {
      type: Number,
      required: false,
    }
  },
  data() {
    return {
      pokemon: {
        id: 0,
        name: '',
        types: [],
        sprite: '',
      },
    }
  },
  methods: {
    async initPokemonDetail() {
      try {
        const id = extractIdFromUrl(this.evolutionChain.species.url)
        console.log(id);
        const pokemon = await pokedex.getPokemonByName(id);
        this.pokemon = mapPokemon(pokemon);
      } catch(err) {
        console.log(err);
        alert("Something went wrong");
      }
    },
    computePosition(evolutionsLength, index, depth) {
      if (evolutionsLength === 1) {
        return `1-${depth}`;
      } else if (evolutionsLength === 2) {
        return `${index * 2}-${depth}`;
      } else {
        return `${index}-${depth}`;
      }
    },
    computePositionArrow(index, depth) {
      return `${index}-${depth}`
    },
  },
  mounted() {
    this.initPokemonDetail();
  },
}
</script>

<style scoped>

</style>
