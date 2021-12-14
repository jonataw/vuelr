<template>
  <div v-if="error" :class="`${config.className}-error`">
    <span v-text="error" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useVuelr } from '../../composables/use-vuelr';

export const props = {
  error: {
    type: String as PropType<string | null>
  }
};

export default defineComponent({
  name: 'VuelrError',
  props,
  setup(_props, _context) {
    const { config } = useVuelr();
    return { config };
  }
});
</script>
