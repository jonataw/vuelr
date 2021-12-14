# Demo

Try editing the code below and see the preview above change in real-time!

<Vuelr v-model="code" scoped />

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const code = ref(`<template>
  <span>Hello {{ name }}!</span>
</template>

<script>
export default {
  data() {
    return {
      name: 'Vuelr'
    }
  }
}
<\/script>

<style lang="scss">
span {
  font-weight: bold;
  color: purple;
}
<\/style>`);
    return { code };
  }
})
</script>
