<template>
  <div class="container bg-white">
    <button class="btn advanced-search-button" type="button" @click="updateVisibility"
            v-html="visibilityMessage">
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShown: false,
    }
  },
  name: "AdvancedSearchButton",
  methods: {
    updateVisibility() {
      this.$emit('updateVisibility');
      this.isShown = !this.isShown;
    }
  },
  computed: {
    visibilityMessage() {
      return `${this.isShown ? 'Hide' : 'Show'} advanced search`;
    }
  },
}
</script>

<style scoped>
.advanced-search-button {
  font-size: 12px;
  background-color: #616161 !important;
  color: white !important;
  border-radius: 0 0 25px 25px !important;
}

.advanced-search-button:hover {
  background-color: #616161;
}
</style>
