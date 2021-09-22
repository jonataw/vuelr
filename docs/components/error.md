# VuelrError

Allows reordering, wrapping or moving around the Error component.

<Vuelr v-model="code" v-slot="{ error, id }">
  <div>
    <VuelrError :error="error || 'No error right now!'" />
    <div :id="id" style="display: none" />
  </div>
</Vuelr>

```HTML
<Vuelr v-model="code" v-slot="{ error }">
  <VuelrError :error="error || 'No error right now!'" />
</Vuelr>
```

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class extends Vue {
  code = ``;
}
</script>

## Props

<div class="prop_table">

| Name  | Type                         | Default     | Description                                          |
| ----- | ---------------------------- | ----------- | ---------------------------------------------------- |
| error | <T>string</T> \| <T>null</T> | <T>null</T> | Changes the error text to be shown in the component. |

</div>
