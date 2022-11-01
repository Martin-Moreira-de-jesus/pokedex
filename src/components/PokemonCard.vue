<template>
  <article class="d-flex justify-content-center flex-column m-2 bg-white ps-2 pe-2 pt-1">
    <img :src="sprite" class="rounded card-image" style="background-color: #F2F2F2;" v-bind:alt="spriteAlt">
    <div class="ms-3 me-3 mt-1 d-flex flex-column align-items-stretch">
      <h6 class="m-0" v-html="fullId"></h6>
      <h5 class="p-0 m-0 m-0 text-capitalize" v-html="name"></h5>
      <ul class="d-flex justify-content-around list-unstyled">
        <li v-for="type in types" :key="type.slot">
          <button :class="typeClass(type.type.name)" class="btn-type p-0 align-bottom"
                  style="display: inline-flex; align-items: flex-end; justify-content: center">
            {{ type.type.name }}
          </button>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
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
  name: "PokemonCard",
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
      return `#${this.id.toString().padStart(4, "0")}`;
    }
  },
}
</script>

<style scoped>
article {
  width: 250px;
}

.card-image {
  width: 100%;
  height: 100%;
}
</style>