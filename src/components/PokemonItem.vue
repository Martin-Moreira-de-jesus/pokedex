<template>
  <div class="container bg-white" style="height: 75px;"></div>
  <pokemon-item-nav
      v-if="pokemon.id"
      :pokemon-id="pokemon.id"
      class="container p-0"/>
  <div class="container main-bg-pokedex">
    <article class="pokemon-details bg-white p-5">
      <h2 class="text-uppercase">{{ pokemon.name }} {{ fullId }}</h2>
      <div>
        <div class="row g-5 gx-5">
          <div class="col-12 col-xxl-6 justify-content-center">
            <div class="bg-light">
              <img :src="pokemon.spriteUrl" alt="{{ pokemon?.name }}'s sprite"
                   class="w-auto"
                   style="max-width: 100%; min-width: 100%;">
            </div>
          </div>
          <div class="col-12 col-xxl-6 justify-content-center">
            <pokemon-item-detail v-if="pokemon.species"
                          :pokemon="pokemon"
                          :species="pokemon.species"
                          @form-chosen="(form) => onFormChosen(form)"/>
          </div>
          <div class="col-12 col-xxl-6 justify-content-center">
            <pokemon-item-stats v-if="pokemon" :pokemon="pokemon"/>
          </div>
          <div class="col-12 col-xxl-6 justify-content-center">
            <pokemon-item-typing v-if="pokemon.typesDetail.length > 0" :pokemon-types="pokemon.typesDetail"/>
          </div>
          <div class="col-12 justify-content-center">
            <pokemon-item-evolution v-if="pokemon.species" :specie="pokemon.species" />
          </div>
          <div class="col-12 justify-content-center">
            <pokemon-item-moves v-if="pokemon.moves && pokemon.color" :moves="pokemon.moves" :pokemonColor="pokemon.color"/>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import api from '@/services/api';
import {Pokedex} from "pokeapi-js-wrapper";
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
  },
  data() {
    return {
      pokedex: new Pokedex(),
      pokemon: {
        id: 0,
        name: '',
        spriteUrl: '',
        height: 0,
        abilities: [],
        types: [],
        typesDetail: [],
        forms: [],
        stats: [],
        highestStat: [],
        color: '',
      },
    }
  },
  emits: ['force-update'],
  methods: {
    typeColor(type) {
      return `btn-${type}`;
    },
    onFormChosen(form) {
      console.log(form);
    }
  },
  computed: {
    pokemonColor() {
      return `pokemon-${this.pokemon.color}`;
    },
    fullId() {
      return `#${this.pokemon.id.toString().padStart(3, "0")}`;
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const pokemonData = await api.getPokemon(id);
      this.pokemon.name = pokemonData.name;
      this.pokemon.spriteUrl = pokemonData.sprites.other["official-artwork"].front_default;
      this.pokemon.id = pokemonData.id;
      this.pokemon.height = pokemonData.height / 10;
      this.pokemon.weight = pokemonData.weight / 10;
      this.pokemon.abilities = pokemonData.abilities;
      this.pokemon.types = pokemonData.types;
      this.pokemon.forms = pokemonData.forms;
      this.pokemon.stats = pokemonData.stats;
      this.pokemon.moves = pokemonData.moves;
      this.pokemon.highestStat = this.pokemon.stats.sort((a, b) => {
        if (a.base_stat > b.base_stat) return -1;
        if (a.base_stat < b.base_stat) return 1;
        return 0;
      })[0].base_stat;
      const specie = await api.getPokemonSpecie(pokemonData.species.name);
      this.pokemon.species = specie;
      this.pokemon.color = specie.color.name;
      this.pokemon.typesDetail = await Promise.all(
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
</style>