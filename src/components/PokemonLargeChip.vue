<template>
  <p :class="typeClass(className)" class="btn-type p-0 m-0">
    <span>{{ content ?? className }}</span>
  </p>
</template>

<script>
export default {
  name: "PokemonLargeChip",
  props: {
    className: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false
    }
  },
  methods: {
    typeClass(type) {
      return `chip-${type}`;
    },
  }
}
</script>

<style scoped>
p {
  width: 110px;
}
span {
  position: relative;
  top: 4px;
  font-size: 13px;
}
</style>
