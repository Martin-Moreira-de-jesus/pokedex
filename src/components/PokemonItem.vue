<template>
  <div class="container bg-white" style="height: 75px;"></div>
  <pokemon-item-nav
      v-if="pokemon.id"
      :pokemon-id="pokemon.id"
      class="container p-0"/>
  <div class="container main-bg-pokedex">
    <article class="pokemon-details bg-white p-5">
      <h2 class="text-uppercase" v-if="pokemon.id">{{ !defaultForm && !!form.name ? form.name : pokemon.name }} {{ fullId }}</h2>
      <div>
        <div class="row g-5 gx-5">
          <div class="col-12 col-xxl-6 justify-content-center">
            <div class="bg-light">
              <pokemon-item-form :pokemon="currentForm"/>
            </div>
          </div>
          <div class="col-12 col-xxl-6 justify-content-center">
            <pokemon-item-detail v-if="pokemon.id && species.id"
                          :pokemon="pokemon"
                          :species="species"
                          @form-chosen="(form) => onFormChosen(form)"/>
          </div>
          <div class="col-12 col-xxl-6 justify-content-center">
            <pokemon-item-stats v-if="pokemon.stats" :pokemon="pokemon"/>
          </div>
          <div class="col-12 col-xxl-6 justify-content-center">
            <pokemon-item-typing v-if="typesDetail.length" :pokemon-types="typesDetail"/>
          </div>
          <div class="col-12 justify-content-center">
            <pokemon-item-evolution v-if="species.id" :specie="species" />
          </div>
          <div class="col-12 justify-content-center">
            <pokemon-item-moves v-if="pokemon.moves && species.color" :moves="pokemon.moves" :pokemonColor="species.color.name"/>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import api, {mapPokemon, pokedex} from '@/services/api';
import {Pokedex} from "pokeapi-js-wrapper";
import PokemonItemForm from "@/components/PokemonItemForm";
import PokemonItemDetail from "@/components/PokemonItemDetail";
import PokemonItemStats from "@/components/PokemonItemStats";
import PokemonItemNav from "@/components/PokemonItemNav";
import PokemonItemMoves from "@/components/PokemonItemMoves";
import PokemonItemEvolution from "@/components/PokemonItemEvolution";
import PokemonItemTyping from "@/components/PokemonItemTyping";

export default {
  name: "PokemonItem",
  components: {
    PokemonItemDetail,
    PokemonItemStats,
    PokemonItemNav,
    PokemonItemMoves,
    PokemonItemEvolution,
    PokemonItemTyping,
    PokemonItemForm
  },
  data() {
    return {
      pokedex: new Pokedex(),
      pokemon: {},
      species: {},
      typesDetail: [],
      form: {},
      defaultForm: true,
    }
  },
  emits: ['force-update'],
  methods: {
    typeColor(type) {
      return `btn-${type}`;
    },
    async onFormChosen(form) {
      try {
        this.form = {};
        if (form.is_default) {
          this.form = {};
          this.defaultForm = true;
        } else {
          this.defaultForm = false;
          this.form = await pokedex.getPokemonByName(form.pokemon.name);
          this.form = mapPokemon(this.form);
          this.pokemon.highestStat = this.pokemon.stats.sort((a, b) => {
            if (a.base_stat > b.base_stat) return -1;
            if (a.base_stat < b.base_stat) return 1;
            return 0;
          })[0].base_stat;
        }
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }
    }
  },
  computed: {
    pokemonColor() {
      return `pokemon-${this.species.color}`;
    },
    fullId() {
      return `#${this.pokemon.id.toString().padStart(3, "0")}`;
    },
    currentForm() {
      return this.defaultForm ? this.pokemon : this.form;
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const pokemonData = await api.getPokemon(id);
      this.pokemon = mapPokemon(pokemonData);
      this.pokemon.height = pokemonData.height / 10;
      this.pokemon.weight = pokemonData.weight / 10;
      this.pokemon.highestStat = this.pokemon.stats.sort((a, b) => {
        if (a.base_stat > b.base_stat) return -1;
        if (a.base_stat < b.base_stat) return 1;
        return 0;
      })[0].base_stat;
      this.species = await pokedex.getPokemonSpeciesByName(this.pokemon.species.name);
      this.typesDetail = await Promise.all(
          this.pokemon.types.map((type) => this.pokedex.getType(type.type.name))
      );
    } catch (err) {
      if (err.response?.status === 404) {
        this.$router.push('/');
      } else {
        console.log(err);
        alert("Something went wrong");
      }
    }
  },
}
</script>

<style scoped>
.pokemon-details {
  width: 90%;
  margin: auto;
}

@media (max-width: 900px) {
  .pokemon-details {
  width: 100%;
}
}
</style>