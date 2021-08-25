<template>
  <div class="vuelr-preview">
    <div :id="id" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '@/utils/decorators';

@Component({ name: 'VuelrPreview' })
export default class Preview extends Vue {
  @Prop({ type: String }) readonly id!: string;
}
</script>
