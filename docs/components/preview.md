# VuelrPreview

Allows reordering, wrapping or moving around the Preview component.

<Vuelr v-model="code" v-slot="{ id }">
  <div style="background-color: #78b064; border-radius: 6px; border: none; color: white">
    <VuelrPreview :id="id" />
  </div>
</Vuelr>

```HTML
<Vuelr v-model="code" v-slot="{ id }">
  <div style="background-color: #78b064; border-radius: 6px; border: none; color: white">
    <VuelrPreview :id="id" />
  </div>
</Vuelr>

<script>
  export default {
    data() {
      return {
        code: `<p>This preview is wrapped in a &lt;div&gt; with styling.</p>`
      }
    }
  }
</script>
```

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class extends Vue {
  code = `<p>This preview is wrapped in a &lt;div&gt; with styling.</p>`;

}
</script>

## Props

<div class="prop_table">

| Name           | Type          | Default | Description                                                                                 |
| -------------- | ------------- | ------- | ------------------------------------------------------------------------------------------- |
| id <Required/> | <T>string</T> |         | [id](/components/vuelr#slots) from the [Vuelr](/components/vuelr) component slot variables. |

</div>
