<template>
  <div :class="`${config.className}-preview`" :id="id" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelr } from '../../composables/use-vuelr';

export const props = {
  id: {
    type: String
  }
};

export default defineComponent({
  name: 'VuelrPreview',
  props,
  setup(_props, _context) {
    const { config } = useVuelr();
    return { config };
  }
});
</script>
