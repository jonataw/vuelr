# VuelrError

Allows reordering, wrapping or moving around the Error component. The Vuelr component exposes the `error` slot variable that can be used to show the current error.

<Vuelr v-model="code" />

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const code = ref(`<Vuelr v-model="code" v-slot="{ error, id }">
  <div>
    <VuelrError :error="error || 'No error right now!'" />
    <div :id="id" style="display: none" />
  </div>
</Vuelr>

<script>
export default {
  data() {
    return {
      code: ''
    }
  }
}
<\/script>`);
    return { code };
  }
})
</script>

## Props

<div class="prop_table">

| Name  | Type           | Default | Description                                          |
| ----- | -------------- | ------- | ---------------------------------------------------- |
| error | string \| null | null    | Changes the error text to be shown in the component. |

</div>
