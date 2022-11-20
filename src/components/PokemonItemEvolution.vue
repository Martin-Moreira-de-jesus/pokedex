<template>
  <article class="bg-light overflow-scroll">
    <h4 class="pt-2">Evolution chain</h4>
    <div v-if="evolutionChain"
         :class="{'evolution-nodes': evolutionChain.species.name !== 'eevee', 'eevee-nodes': evolutionChain.species.name === 'eevee'}">
      <pokemon-item-evolution-node :evolution-chain="evolutionChain"
                                   :position="evolutionChain.species.name === 'eevee' ? '1-1' : '1-0'"
                                   :depth="0"/>
    </div>
    <p v-else-if="!hasEvolution" class="text-danger">This pokemon is not part of an evolution chain !</p>
  </article>
</template>

<script>
import {pokedex} from "@/services/api";
import {extractIdFromUrl} from "@/services/utils";
import PokemonItemEvolutionNode from "@/components/PokemonItemEvolutionNode";

export default {
  name: "PokemonItemEvolution",
  components: {PokemonItemEvolutionNode},
  props: {
    specie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hasEvolution: true,
      evolutionChain: null,
    }
  },
  methods: {
    async initEvolutionChain() {
      try {
        if (!this.specie.evolution_chain) {
          this.hasEvolution = false;
          return;
        }

        let index = extractIdFromUrl(this.specie.evolution_chain.url);

        const response = await pokedex.getEvolutionChain(index);
        if (response.chain.evolves_to.length === 0) {
          this.hasEvolution = false;
        } else {
          this.evolutionChain = response.chain;
        }
      } catch (err) {
        console.log(err);
        alert('Something went wrong');
      }
    },
  },
  mounted() {
    this.initEvolutionChain();
  }
}
</script>

<style scoped>
.evolution-nodes {
  display: grid;
  grid-template-areas:
    'card-0-0 arrow-0-0 card-0-1 arrow-0-1 card-0-2'
    'card-1-0 arrow-1-0 card-1-1 arrow-1-1 card-1-2'
    'card-2-0 arrow-2-0 card-2-1 arrow-2-1 card-2-2';
  justify-content: center;
}

.eevee-nodes {
  display: grid;
  grid-template-areas:
    'card-0-0 white1 card-0-1 white2 card-0-2'
    'white3 arrow-0-0 arrow-0-1 arrow-0-2 white4'
    'card-1-0 arrow-1-0 card-1-1 arrow-1-1 card-1-2'
    'white5 arrow-2-0 arrow-2-1 arrow-2-2 white6'
    'card-2-0 white7 card-2-1 white8 card-2-2';
  justify-content: center;
}
</style>