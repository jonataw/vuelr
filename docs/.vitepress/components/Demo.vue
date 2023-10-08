<template>
  <Vuelr :code="code" v-slot="{ target }" class="flex">
    <div :id="target" class="preview" />
    <textarea v-model="code" />
  </Vuelr>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const code = ref(`<template>
  <div>
    <h5>Hello {{name}}!</h5>
    <p>Edit the code to the right and see it update here in realtime!</p>
    <button @click="click">Button</button>
  </div>
</template>

<script>
export default {
  data() {
   	return {
      name: 'Vuelr'
    }
  },
  methods: {
    click() {
      alert('Click')
    }
  }
}
<\/script>

<style>
h5 {
  color: var(--vp-c-brand-1);
}
</style>`);

    return { code };
  },
});
</script>

<style lang="scss">
.flex {
  display: flex;

  .preview {
    padding: 1rem;
    border: 1px solid var(--vp-c-border);
    border-right: none;
    border-radius: 4px 0 0 4px;
    flex: 1;
  }

  textarea {
    padding: 1rem;
    margin: 0;
    border: 1px solid var(--vp-c-border);
    border-radius: 0 4px 4px 0;
    flex: 1;
  }
}
</style>
