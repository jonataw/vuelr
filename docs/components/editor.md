# VuelrEditor

VuelrEditor uses [CodeMirror](https://codemirror.net/). If you would like to use a custom editor, see [Custom Editor](/usage/slots#custom-editor).

<Vuelr v-model="code" />

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const code = ref(`
<template>
  <VuelrEditor model-value="<p>This is just the default editor.</p>">
</template>`);
    return { code };
  }
})
</script>

## Props

<div class="prop_table">

| Name            | Type    | Default | Description                  |
| --------------- | ------- | ------- | ---------------------------- |
| value / v-model | string  |         | Current value of editor.     |
| readonly        | boolean | false   | Sets the editor as readonly. |

</div>

## Events

<div class="event_table">

| Event | Arguments | Description                 |
| ----- | --------- | --------------------------- |
| input |           | Emitted when value changes. |

</div>
