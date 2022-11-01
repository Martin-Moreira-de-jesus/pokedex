<template>
  <section class="container search-bar d-flex justify-content-center">
    <div class="d-flex align-items-start flex-column w-75">
      <label class="search-label mt-3" for="search" style="font-size: 20px;">Enter name or number</label>
      <div class="search-container d-flex w-100">
        <input id="search" v-model="searchCriteria" type="text">
        <button class="btn ms-2  btn-primary search-button p-0 m-0" @click="search()">
          <img :src="require('@/assets/images/search-icon.png')" alt="search icon" class="">
        </button>
      </div>
      <small class="mt-1 mb-2" style="font-size: 12px;">For more precise filters, checkout advanced search !</small>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchCriteria: '',
    }
  },
  name: "SearchBar",
  methods: {
    search() {
      this.$emit('search', this.searchCriteria);
    }
  }
}
</script>

<style scoped>
.search-bar {
  background: #313131;
  color: white;
}

#search {
  height: 40px;
  border: solid 3px grey;
  border-radius: 5px;
}

@media (max-width: 500px) {
  .search-container {
    justify-content: center;
  }

  #search {
    max-width: 200px;
  }
}

.search-button img {
  height: 40px;
}
</style>
