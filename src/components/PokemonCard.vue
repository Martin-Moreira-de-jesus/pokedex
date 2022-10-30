<template>
  <article class="d-flex justify-content-center flex-column m-2 bg-white ps-2 pe-2 pt-1" style="width: 250px">
    <img :src="sprite" v-bind:alt="spriteAlt" class="rounded card-image" style="background-color: #F2F2F2;">
    <div class="ms-3 me-3 mt-1 d-flex flex-column align-items-stretch">
      <h6 v-html="fullId" class="m-0"></h6>
      <h5 v-html="name" class="p-0 m-0 m-0 text-capitalize"></h5>
      <ul class="d-flex justify-content-around list-unstyled">
        <li v-for="type in types" :key="type.slot">
          <button class="btn-type p-0 align-bottom" :class="typeClass(type.type.name)"
                  style="display: inline-flex; align-items: flex-end; justify-content: center">
            {{ type.type.name }}
          </button>
<!--          <img :src="require(`../assets/images/types/${type.type.name}.png`)" :alt="computeAlt(type.type.name)">-->
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
    computeAlt(type) {
      return `${type} type sprite`
    },
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
.card-image {
  width: 100%;
  height: 100%;
}
</style>