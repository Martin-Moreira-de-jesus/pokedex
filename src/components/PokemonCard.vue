<template>
  <article class="d-flex justify-content-center flex-column m-2 bg-white ps-2 pe-2 pt-1"
           :class="randomSlide" @click="$router.push({ name: 'pokedex-entry', params: { id: id } })">
    <img :src="imageLoading ? require('@/assets/images/pokeball.png') : sprite"
         class="rounded card-image"
         style="background-color: #F2F2F2;"
         :alt="spriteAlt"
         @load="imageLoading = false">
    <div class="ms-3 me-3 mt-1 d-flex flex-column align-items-stretch">
      <h6 class="m-0" v-html="fullId"></h6>
      <h5 class="p-0 m-0 m-0 text-capitalize" v-html="name"></h5>
      <ul class="d-flex justify-content-around list-unstyled">
        <li v-for="type in types" :key="type.slot">
          <pokemon-large-chip :class-name="type.type.name"/>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import PokemonLargeChip from "@/components/PokemonLargeChip";

export default {
  name: "PokemonCard",
  components: {PokemonLargeChip},
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    sprite: {
      type: String,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      imageLoading: true,
    }
  },
  methods: {
    typeClass(type) {
      return `btn-${type}`;
    }
  },
  computed: {
    spriteAlt() {
      return `${this.name} sprite`;
    },
    fullId() {
      return `#${this.id.toString().padStart(3, "0")}`;
    },
    randomSlide() {
      const directions = ['top', 'right', 'bottom', 'left'];
      return `slide-${directions[Math.floor(Math.random() * 4)]}`;
    },
  },
}
</script>

<style scoped>
article {
  min-width: 250px;
  max-width: 250px;
  width: auto;
  position: relative;
}

article:hover {
  transform: matrix(1.1, 0, 0, 1.1, 0, 2);
  cursor: pointer;
}

.slide-left {
  animation: slider-left 1s;
}

.slide-right {
  animation: slider-right 1s;
}

.slide-top {
  animation: slider-top 1s;
}

.slide-bottom {
  animation: slider-bottom 1s;
}

.card-image {
  width: 100%;
  height: 100%;
}

@keyframes slider-right {
  from {
    opacity: 0;
    right: -100px;
  }
  to {
    right: 0;
    opacity: 100%;
  }
}

@keyframes slider-left {
  from {
    opacity: 0;
    left: -100px;
  }
  to {
    left: 0;
    opacity: 100%;
  }
}

@keyframes slider-top {
  from {
    opacity: 0;
    top: -100px;
  }
  to {
    top: 0;
    opacity: 100%;
  }
}

@keyframes slider-bottom {
  from {
    opacity: 0;
    top: -100px;
  }
  to {
    top: 0;
    opacity: 100%;
  }
}

</style>
