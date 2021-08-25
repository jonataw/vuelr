<!-- A.vue -->
<template>
  <span class="argument">
    <span class="table-tag">{{ name }}:<T v-text="type.replace('\\', '')"></T></span>
    <span v-text="description"></span>
  </span>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true }
  }
};
</script>

<style lang="scss" scoped>
.argument {
  margin-bottom: 8px;
  display: block;
  > span:first-of-type {
    padding-right: 0 !important;
    background-color: #efe2ff !important;
    color: #6632a1 !important;
    a {
      color: #6632a1 !important;
    }
  }

  .type {
    margin-left: 6px !important;
  }
}
</style>
