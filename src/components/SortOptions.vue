<template>
  <section class="d-flex justify-content-center m-2">
    <div class="d-flex flex-row flex-wrap">
      <p class="m-auto">Sort by : </p>
      <select class="btn btn-primary" v-model="orderBy" @change="$emit('sort', orderBy)">
        <option value=1>Ascending (id)</option>
        <option value=2>Descending (id)</option>
        <option value=3>Ascending (name)</option>
        <option value=4>Descending (name)</option>
      </select>
    </div>
  </section>
</template>

<script>
export default {
  name: "SortOptions",
  data() {
    return {
      orderBy: 1,
    }
  }
}
</script>

<style scoped>

</style>