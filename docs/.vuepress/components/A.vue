<template>
  <div class="a">
    <span class="name" v-text="name" />
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: { name: String },
  setup() {}
});
</script>

<style lang="scss">
.a {
  display: flex;
  align-items: flex-start;

  .name {
    color: var(--c-bg);
    border-radius: 3px;
    background-color: rgb(14, 132, 168);
    margin-right: 8px;
    padding: 0 4px;
  }
}
</style>
