# Slots

[VuelrEditor](/components/editor), [VuelrPreview](/components/preview) and [VuelrError](/components/error) are all **optional** components, meaning you can substitute them with your own components or elements using **slots**.

## Custom Editor

Vuelr has built in support for [CodeMirror](https://codemirror.net/). CodeMirror is only loaded if you use the [VuelrEditor](/components/editor) component. You may use any editor you like by using the preview slot.

<div class="custom-editor-example">
  <Vuelr :value="code">
    <template v-slot:editor>
      <textarea v-model="code" cols="20" rows="10" />
    </template>
  </Vuelr>
</div>

<SourceCode lang="Vue">
```HTML{3}
<Vuelr :value="code">
  <template v-slot:editor>
    <textarea v-model="code" />
  </template>
</Vuelr>
```
</SourceCode>

## Custom Preview

The [VuelrPreview](/components/preview) component can be changed by using the preview slot. The [Vuelr](/components/vuelr) component exposes an `id` slot prop that your preview component or element should use as id attribute.

<SourceCode lang="Vue">
```HTML{3}
<Vuelr v-model="code">
  <template v-slot:preview="{ id }">
    <div :id="id" />
  </template>
</Vuelr>
```
</SourceCode>

## Custom Error

The [Vuelr](/components/vuelr) component exposes an `error` slot prop that you may use to show the error message in your own component or element.

<SourceCode lang="Vue">
```HTML{3}
<Vuelr v-model="code">
  <template v-slot:error="{ error }">
    <span class="my-own-error">{{ error }}</span>
  </template>
</Vuelr>
```
</SourceCode>

## The Default Slot

By using the default slot you are also able to reorder the editor, preview and error elements as you like. The same slot props as in above examples are now available as default slot props.

<SourceCode lang="Vue">
```HTML
<Vuelr :value="code" v-slot="{ id, error }">
  <div>
    <span class="my-error-element">{{ error }}</span>
    <textarea v-model="code" class="my-editor" />
    <div class="my-preview-element" :id="id" />
  </div>
</Vuelr>
```
</SourceCode>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class extends Vue {
  code = `<p>This example uses a <b>textarea</b> element as editor!</p>`;
}
</script>

<style scoped lang="scss">
.custom-editor-example {
  border-radius: 4px;

  textarea {
width: 100%;
padding: 1rem;
max-width: 100%;
min-width: 100%;
  border: 1px solid #e3e3e3;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #78b064;
  }
  }
}
</style>
