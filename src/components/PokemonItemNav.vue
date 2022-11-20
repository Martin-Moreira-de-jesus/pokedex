<template>
  <nav class="pokemon-nav d-flex flex-column bg-light">
    <div>
      <router-link class="btn btn-home"
                   :to="{name: 'pokedex'}">
        <img src="../assets/images/arrow-left-circle.svg"
             alt="left arrow"
             width="32"
             height="32"
             class="nav-arrow">
        <span class="ms-2 me-2 fw-bold">HOME</span>
      </router-link>
    </div>
    <div class="d-flex w-100">
      <router-link class="pokemon-link d-flex align-items-center justify-content-center align-items-start"
                   style="background-color: grey; font-size: 25px;" :to="{name: 'pokedex-entry', params : { id: previousId } }">
        <img src="../assets/images/arrow-left-circle.svg"
             alt="left arrow"
             width="32"
             height="32"
             class="nav-arrow">
        <span class="ms-2 me-2 text-light">{{ fullId(previousId) }}</span>
      </router-link>
      <div class="p-1 bg-light"></div>
      <router-link class="pokemon-link d-flex align-items-center justify-content-center align-items-center"
                   style="background-color: grey; font-size: 25px;" :to="{name: 'pokedex-entry', params : { id: nextId } }">
        <span class="me-2 text-light" >{{ fullId(nextId) }}</span>
        <img class="ms-2 nav-arrow"
             src="../assets/images/arrow-right-circle.svg"
             alt="right arrow"
             width="32"
             height="32">
      </router-link>
    </div>
  </nav>
</template>

<script>
import {LAST_POKEMON_ID} from "@/services/constants";

export default {
  name: "PokemonItemNav",
  emits: ['force-update'],
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    previousId() {
      return this.pokemonId === 1 ? LAST_POKEMON_ID : this.pokemonId - 1;

    },
    nextId() {
      return this.pokemonId === LAST_POKEMON_ID ? 1 : this.pokemonId + 1;
    }
  },
  methods: {
    fullId(id) {
      return `#${id.toString().padStart(3, "0")}`;
    }
  }
}
</script>

<style scoped>
.pokemon-nav {
  height: 100px;
}

.pokemon-link {
  display: block;
  text-decoration: none;
  width: 100%;
}

.nav-arrow {
  position: relative;
  bottom: 3px;
}

a:hover, .btn-home:hover{
  background-color: #30a7d7 !important;
}

.btn-home {
  background-color: grey;
  padding: 1px 1px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: white;
}

</style>
