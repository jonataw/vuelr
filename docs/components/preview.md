# VuelrPreview

Allows reordering, wrapping or moving around the Preview component.

<Vuelr v-model="code" />

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const code = ref(`<Vuelr v-model="code" v-slot="{ id }">
  <div style="background-color: #78b064; border-radius: 6px; border: none; color: white">
    <VuelrPreview :id="id" />
  </div>
</Vuelr>

<script>
export default {
  data() {
    return {
      code: '<p>This preview is wrapped in a div element with styling.</p>'
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

| Name | Type   | Default | Description                                                                                 |
| ---- | ------ | ------- | ------------------------------------------------------------------------------------------- |
| id   | string |         | [id](/components/vuelr#slots) from the [Vuelr](/components/vuelr) component slot variables. |

</div>
