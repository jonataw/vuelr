<template>
  <div
    :class="[
      `${config.className}-editor`,
      { [`${config.className}-editor-loading`]: !ready }
    ]"
  >
    <textarea ref="textarea" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useVuelr } from '../../composables/use-vuelr';

export const props = {
  modelValue: {
    type: String
  },
  readonly: {
    type: Boolean
  }
};

export default defineComponent({
  name: 'VuelrEditor',
  props,
  emits: ['change'],
  setup(props, context) {
    const { config } = useVuelr();

    const ready = ref(false);
    const textarea = ref(null);

    onMounted(async () => {
      let CodeMirror: any;
      try {
        // @ts-ignore
        const module = await import('codemirror');
        CodeMirror = module.default || module;

        // @ts-ignore
        await import('codemirror/mode/vue/vue');

        // @ts-ignore
        await import('codemirror/lib/codemirror.css');

        const editor = CodeMirror.fromTextArea(textarea.value, {
          ...config.value.codemirror,
          readOnly: props.readonly
        });

        editor.setValue(props.modelValue);
        editor.on('change', () => {
          context.emit('change', editor.getValue());
        });

        ready.value = true;
      } catch (error) {
        console.error(error);
        console.error(
          `Failed to load dependency 'codemirror'. Have you installed the dependency?\nnpm install codemirror`
        );
        return;
      }
    });

    return { config, ready, textarea };
  }
});
</script>
