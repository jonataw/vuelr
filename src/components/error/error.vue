<template>
  <div v-if="error" class="vuelr-error">
    <span v-text="error" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '@/utils/decorators';

@Component({ name: 'VuelrError' })
export default class Button extends Vue {
  @Prop({ type: String, default: null }) readonly error?: string | null;
}
</script>
