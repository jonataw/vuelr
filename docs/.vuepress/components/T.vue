<template>
  <div class="t">
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
.t {
  padding: 0.6em 1em;
  display: flex;
  align-items: flex-start;

  .name {
    color: var(--c-bg);
    border-radius: 3px;
    background-color: var(--c-badge-tip);
    margin-right: 8px;
    padding: 0 4px;
  }

  + .t {
    border-top: 1px solid var(--c-border-dark);
  }
}
</style>
