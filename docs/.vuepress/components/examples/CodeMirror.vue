<template>
  <Vuelr :code="code" v-slot="{ target }">
    <div class="codemirror-example">
      <div :id="target" class="preview" />
      <div :id="id"></div>
    </div>
  </Vuelr>
</template>

<script>
import { defineComponent, nextTick, onMounted, ref } from 'vue';

export default defineComponent({
  props: { id: String },
  setup(props, _context) {
    const code = ref(`<template>
  <div>
    <h5>Hello {{name}}!</h5>
    <p>Edit the code to the right and see it update here in realtime!</p>
  </div>
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

<style>
h5 {
  color: #3eaf7c;
}
</style>`);

    onMounted(() => {
      nextTick(async () => {
        const module = await import('codemirror');
        await import('codemirror/mode/vue/vue');
        await import('codemirror/lib/codemirror.css');

        const CodeMirror = module.default || module;

        const codemirror = CodeMirror(document.getElementById(props.id), {
          lineNumbers: true,
          value: code.value,
          mode: 'text/x-vue'
        });

        codemirror.on('change', (value, a) => {
          code.value = codemirror.getValue();
        });
      });
    });

    return { code };
  }
});
</script>

<style lang="scss">
.codemirror-example {
  display: grid;
  grid-template-columns: 1fr 2fr;

  > * {
    flex-shrink: 0;
    min-width: 0;
    min-height: 0;
  }

  .preview {
    padding: 1rem;
    border: 1px solid var(--c-border);

    // Some default styling just to not clutter the example too much!
    > div {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      h5 {
        margin-top: 4px;
        margin-bottom: 4px;
      }
      p {
        margin: 0;
      }
    }
  }
}
</style>
