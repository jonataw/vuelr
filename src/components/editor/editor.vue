<template>
  <div class="vuelr-editor" :class="{ 'vuelr-editor-loading': !ready }">
    <textarea ref="textarea" :value="value" @input="handleChange"></textarea>
  </div>
</template>

<script lang="ts">
// eslint-disable @typescript-eslint/ban-ts-comment

import { Component, Prop, Vue } from '@/utils/decorators';
import { VuelrConfig } from '@/vuelr.d';

@Component({ name: 'VuelrEditor' })
export default class Button extends Vue {
  @Prop({ type: String }) readonly value?: any;
  @Prop({ type: Boolean, default: false }) readonly readonly!: boolean;

  ready = false;

  get config(): VuelrConfig {
    return this.$vuelr.config;
  }

  async mounted(): Promise<void> {
    let CodeMirror: any;
    try {
      // @ts-ignore
      const module = await import('codemirror');
      CodeMirror = module.default || module;

      // @ts-ignore
      await import('codemirror/mode/vue/vue');

      // @ts-ignore
      await import('codemirror/lib/codemirror.css');

      const theme = this.config.codemirror.theme;
      if (theme && theme !== 'default') {
        // @ts-ignore
        await import(`codemirror/theme/${theme}.css`);
      }

      const editor = CodeMirror.fromTextArea(
        this.$refs.textarea as HTMLTextAreaElement,
        { ...this.config.codemirror, readOnly: this.readonly }
      );

      editor.setValue(this.value);
      editor.on('change', () => this.$emit('input', editor.getValue()));

      this.ready = true;
    } catch (error) {
      console.log(error);
      console.error(
        `Failed to load dependency 'codemirror'. Have you installed the dependency?\nnpm install codemirror`
      );
      return;
    }
  }

  handleChange(event: InputEvent): void {
    this.$emit('input', (event.target as any).value);
  }
}
</script>
