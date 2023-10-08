# Usage

To use Vuelr, add the `<Vuelr>` component to your template. The component
accepts a `code` prop, which is the code to render. Add a target element with
the id set to the `target` slot property.

Add any element to edit the code. In the example below, a simple `textarea` is
used. Feel free to use any editor you like.

```vue
<template>
  <Vuelr :code="code" v-slot="{ target }">
    <div :id="target" />
    <textarea v-model="code" />
  </Vuelr>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {
      code: ref('<p>Hello world!</p>')
    };
  }
});
</script>
```

## Props

| Name   | Type    | Default | Description                                                                                        |
| ------ | ------- | ------- | -------------------------------------------------------------------------------------------------- |
| id     | string  |         | Element id. If not set, a pseudorandom id is generated.                                            |
| code   | string  |         | The code for Vuelr to render.                                                                      |
| scoped | boolean | false   | If `true`, styles are contained to the Vuelr target element, to avoid polluting the global styles. |

## Slots

Vuelr exposes one slot, the default slot. The following properties are passed to the default slot:

| Name      | Type   | Description                                                              |
| ----------| ------ | ------------------------------------------------------------------------ |
| target    | string | The id of the target element.                                            |
| error     | string | The error message, if any.                                               |
| iteration | number | The number of times the code has been rendered.                          |
| compiled  | object | The compiled code. Contains properties `template`, `script` and `style`. |
