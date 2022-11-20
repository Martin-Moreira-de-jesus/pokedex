<template>
  <section v-if="isShown" class="container">
    <h2>Advanced Search</h2>
    <form class="d-flex justify-content-around flex-row flex-wrap" @submit.prevent="(e) => submit(e)">
      <div class="d-flex flex-row flex-wrap justify-content-center">
        <!-- Types and weakness-->
        <div class="d-flex flex-column">
          <h5>Type & weakness</h5>
          <small><strong>T</strong> = Type <strong>W</strong> = Weakness</small>
          <div class="d-flex justify-content-between">
            <ul class="list-unstyled">
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="normal"/>
                <input id="type-normal" class="type-input" name="type-normal" type="checkbox">
                <label class="type-label" for="type-normal">T</label>
                <input id="weakness-normal" class="type-input" name="weakness-normal" type="checkbox">
                <label class="type-label" for="weakness-normal">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="fighting"/>
                <input id="type-fighting" class="type-input" name="type-fighting" type="checkbox">
                <label class="type-label" for="type-fighting">T</label>
                <input id="weakness-fighting" class="type-input" name="weakness-fighting" type="checkbox">
                <label class="type-label" for="weakness-fighting">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="flying"/>
                <input id="type-flying" class="type-input" name="type-flying" type="checkbox">
                <label class="type-label" for="type-flying">T</label>
                <input id="weakness-flying" class="type-input" name="weakness-flying" type="checkbox">
                <label class="type-label" for="weakness-flying">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="poison"/>
                <input id="type-poison" class="type-input" name="type-poison" type="checkbox">
                <label class="type-label" for="type-poison">T</label>
                <input id="weakness-poison" class="type-input" name="weakness-poison" type="checkbox">
                <label class="type-label" for="weakness-poison">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="ground"/>
                <input id="type-ground" class="type-input" name="type-ground" type="checkbox">
                <label class="type-label" for="type-ground">T</label>
                <input id="weakness-ground" class="type-input" name="weakness-ground" type="checkbox">
                <label class="type-label" for="weakness-ground">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="rock"/>
                <input id="type-rock" class="type-input" name="type-rock" type="checkbox">
                <label class="type-label" for="type-rock">T</label>
                <input id="weakness-rock" class="type-input" name="weakness-rock" type="checkbox">
                <label class="type-label" for="weakness-rock">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="bug"/>
                <input id="type-bug" class="type-input" name="type-bug" type="checkbox">
                <label class="type-label" for="type-bug">T</label>
                <input id="weakness-bug" class="type-input" name="weakness-bug" type="checkbox">
                <label class="type-label" for="weakness-bug">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="ghost"/>
                <input id="type-ghost" class="type-input" name="type-ghost" type="checkbox">
                <label class="type-label" for="type-ghost">T</label>
                <input id="weakness-ghost" class="type-input" name="weakness-ghost" type="checkbox">
                <label class="type-label" for="weakness-ghost">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="steel"/>
                <input id="type-steel" class="type-input" name="type-steel" type="checkbox">
                <label class="type-label" for="type-steel">T</label>
                <input id="weakness-steel" class="type-input" name="weakness-steel" type="checkbox">
                <label class="type-label" for="weakness-steel">W</label>
              </li>
            </ul>
            <ul class="list-unstyled">
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="fire"/>
                <input id="type-fire" class="type-input" name="type-fire" type="checkbox">
                <label class="type-label" for="type-fire">T</label>
                <input id="weakness-fire" class="type-input" name="weakness-fire" type="checkbox">
                <label class="type-label" for="weakness-fire">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="water"/>
                <input id="type-water" class="type-input" name="type-water" type="checkbox">
                <label class="type-label" for="type-water">T</label>
                <input id="weakness-water" class="type-input" name="weakness-water" type="checkbox">
                <label class="type-label" for="weakness-water">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="grass"/>
                <input id="type-grass" class="type-input" name="type-grass" type="checkbox">
                <label class="type-label" for="type-grass">T</label>
                <input id="weakness-grass" class="type-input" name="weakness-grass" type="checkbox">
                <label class="type-label" for="weakness-grass">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="electric"/>
                <input id="type-electric" class="type-input" name="type-electric" type="checkbox">
                <label class="type-label" for="type-electric">T</label>
                <input id="weakness-electric" class="type-input" name="weakness-electric" type="checkbox">
                <label class="type-label" for="weakness-electric">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="psychic"/>
                <input id="type-psychic" class="type-input" name="type-psychic" type="checkbox">
                <label class="type-label" for="type-psychic">T</label>
                <input id="weakness-psychic" class="type-input" name="weakness-psychic" type="checkbox">
                <label class="type-label" for="weakness-psychic">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="ice"/>
                <input id="type-ice" class="type-input" name="type-ice" type="checkbox">
                <label class="type-label" for="type-ice">T</label>
                <input id="weakness-ice" class="type-input" name="weakness-ice" type="checkbox">
                <label class="type-label" for="weakness-ice">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="dragon"/>
                <input id="type-dragon" class="type-input" name="type-dragon" type="checkbox">
                <label class="type-label" for="type-dragon">T</label>
                <input id="weakness-dragon" class="type-input" name="weakness-dragon" type="checkbox">
                <label class="type-label" for="weakness-dragon">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="dark"/>
                <input id="type-dark" class="type-input" name="type-dark" type="checkbox">
                <label class="type-label" for="type-dark">T</label>
                <input id="weakness-dark" class="type-input" name="weakness-dark" type="checkbox">
                <label class="type-label" for="weakness-dark">W</label>
              </li>
              <li class="d-flex flex-row">
                <pokemon-large-chip class-name="fairy"/>
                <input id="type-fairy" class="type-input" name="type-fairy" type="checkbox">
                <label class="type-label" for="type-fairy">T</label>
                <input id="weakness-fairy" class="type-input" name="weakness-fairy" type="checkbox">
                <label class="type-label" for="weakness-fairy">W</label>
              </li>
            </ul>
          </div>
          <!-- Id range -->
          <div class="d-flex flex-row align-items-center justify-content-between">
            <h5>Id Range</h5>
            <div class="d-flex d-row">
              <label>
                <input
                    v-model="min"
                    class="range-input" max="905"
                    min="1"
                    name="range-lowest"
                    type="number"
                    @focusout="onFocusOutMin">
              </label>
              <p class="ms-2 me-2">-</p>
              <label>
                <input v-model="max"
                       class="range-input" max="905"
                       min="1"
                       name="range-highest"
                       type="number"
                       @focusout="onFocusOutMax">
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- Generation -->
        <div>
          <h5>Generation</h5>
          <label>
            <select class="form-select form-select-lg mb-3" name="generation">
              <option value="">All</option>
              <option v-for="(generation, index) in generations"
                      :key="index"
                      :name="generation.name"
                      v-html="generation.name">
              </option>
            </select>
          </label>
        </div>
        <!-- Height -->
        <div>
          <h5>Height</h5>
          <ul class="list-unstyled d-flex justify-content-center flex-row">
            <li class="ms-1 me-1">
              <input id="height-small" class="d-none height-weight-input" name="height-small" type="checkbox">
              <label class="img-container" for="height-small">
                <img alt="small sized pokemon"
                     class="pokemon-sizes"
                     src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png">
              </label>
            </li>
            <li class="ms-1 me-1">
              <input id="height-medium" class="d-none height-weight-input" name="height-medium" type="checkbox">
              <label class="img-container" for="height-medium">
                <img alt="medium sized pokemon"
                     class="pokemon-sizes"
                     src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png">
              </label>
            </li>
            <li class="img-container ms-1 me-1">
              <input id="height-large" class="d-none height-weight-input" name="height-large" type="checkbox">
              <label class="img-container" for="height-large">
                <img alt="large sized pokemon"
                     class="pokemon-sizes"
                     src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png">
              </label>
            </li>
          </ul>
        </div>
        <!-- Weight -->
        <div>
          <h5>Weight</h5>
          <ul class="list-unstyled d-flex justify-content-center flex-row">
            <li class="ms-1 me-1">
              <input id="weight-small" class="d-none height-weight-input" name="weight-small" type="checkbox">
              <label class="img-container" for="weight-small">
                <img alt="small pokemon weight"
                     class="pokemon-sizes"
                     src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/172.png">
              </label>
            </li>
            <li class="ms-1 me-1">
              <input id="weight-medium" class="d-none height-weight-input" name="weight-medium" type="checkbox">
              <label class="img-container" for="weight-medium">
                <img alt="medium pokemon weight"
                     class="pokemon-sizes"
                     src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png">
              </label>
            </li>
            <li class="img-container ms-1 me-1">
              <input id="weight-large" class="d-none height-weight-input" name="weight-large" type="checkbox">
              <label class="img-container" for="weight-large">
                <img alt="large pokemon weight"
                     class="pokemon-sizes"
                     src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/321.png">
              </label>
            </li>
          </ul>
        </div>
        <!-- Actions -->
        <div class="mb-3">
          <button class="btn btn-secondary me-2" type="reset">Reset</button>
          <button class="btn btn-primary" type="submit">Search</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import API from '@/services/api';
import PokemonLargeChip from "@/components/PokemonLargeChip";

export default {
  name: "PokedexAdvancedSearchBar",
  components: {PokemonLargeChip},
  data() {
    return {
      min: 1,
      max: 905,
      isShown: false,
      generations: [],
    }
  },
  methods: {
    submit(e) {
      const data = new FormData(e.target);
      this.$emit('advanced-search', data);
    },
    updateVisibility() {
      this.isShown = !this.isShown;
    },
    async getGenerations() {
      this.generations = await API.getGenerations();
    },
    onFocusOutMax() {
      if (this.max < this.min) {
        this.max = this.min;
      }
      if (this.max>= 905) {
        this.max = 905;
      }
    },
    onFocusOutMin() {
      if (this.min > this.max) {
        this.min = this.max;
      }

      if (this.min <= 0) {
        this.min = 1;
      }
    },
  },
  mounted() {
    this.getGenerations();
  },
}
</script>

<style scoped>
section {
  background-color: #616161;
  color: white;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.type-input {
  display: none;
}

.type-label {
  display: block;
  text-align: center;
  background: #F2F2F2;
  border-radius: 50%;
  color: #313131;
  line-height: 30px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  padding: 0;
  border: 0;
  user-select: none;
  margin: 3px 5px;
}

.type-input:checked + label {
  background-color: lightgreen !important;
}

.range-input {
  width: 60px;
}

.pokemon-sizes {
  filter: brightness(15%);
}

.img-container {
  background-color: white;
  border-radius: 15%;
}

.height-weight-input:checked + label {
  background-color: #3B4CCA;
}

select {
  font-size: 12px;
}

select option {
  font-size: 12px;
}
</style>
