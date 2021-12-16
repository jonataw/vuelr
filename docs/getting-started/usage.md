# Usage

Below is a basic example to check if your Vuelr installation is working:

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

:::details Click here to view what the example above should render

<Vuelr :code="code" v-slot="{ target }">
  <div :id="target" />
  <textarea v-model="code" />
</Vuelr>

:::

Vuelr includes very basic `<textarea>` and preview elements for testing the component. Vuelr does not include any sophisticated editor or styling.

It's now up to you to add this using the [slots](#slots) Vuelr exposes. When you populate the default slot, the basic elements are disabled.

The example below uses [CodeMirror](https://codemirror.net). You can also view the complete source code of this component [here](https://github.com/jonataw/vuelr/tree/master/docs/.vuepress/components/examples/CodeMirror.vue).

<ExampleCodeMirror />

## Props

<div class="props">

| Name            | Type   | Default | Description                                                                               |
| --------------- | ------ | ------- | ----------------------------------------------------------------------------------------- |
| code            | string |         | The code for Vuelr to render.                                                             |
| value / v-model | string |         | The code for Vuelr to render. Only applies if you use Vuelr without default slot content. |

</div>

## Events

<div class="events">

| Event             | Arguments                                                  | Description                                                 |
| ----------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| update:modelValue | <A name="value">The value the textarea was changed to.</A> | Only applies if you use Vuelr without default slot content. |

</div>

## Slots

<div class="slots">

| Slot    | Properties                                                                                                                                                                                                                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | <T name="target">The element ID Vuelr tries to render the dynamic component to.</T><T name="iteration">Every change of the code increases iteration by one.</T><T name="error">The current Vuelr error.</T><T name="compiled">Includes the compiled template, script and style as strings.</T> |

</div>

::: tip
Below is an example on how you can access the slot properties.

```vue
<Vuelr :code="code" v-slot="{ target, error, iteration, compiled }">
  <ul>
    <li>{{ target }}</li>
    <li>{{ error }}</li>
    <li>{{ iteration }}</li>
    <li>{{ compiled }}</li>
  </ul>
</Vuelr>
```

:::

<script>
export default {
  data() {
    return {
      code: `<p>Hello world!</p>`,
    }
  }
}
</script>
