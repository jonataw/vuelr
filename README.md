# Vuelr

Vuelr is a component for editing and previewing Vue components or templates in your browser in realtime.

- [Demo](https://jonataw.github.io/vuelr/getting-started/demo.html)
- [Documentation](https://jonataw.github.io/vuelr)

## Documentation

Visit the [documentation](https://jonataw.github.io/vuelr).

## Installation

```sh
# NPM
npm i vuelr codemirror

# Yarn
yarn add vuelr codemirror

# CodeMirror is only needed if you use the default editor.
```

Import Vuelr in your Vue entry file:

```ts
import { createApp } from 'vue';
import { createVuelr, Vuelr } from 'vuelr';

createApp(App)
  .use(
    createVuelr({
      components: [Vuelr]
    })
  )
  .mount('#app');
```

Import the `vuelr.scss` file with Sass:

```scss
@import 'vuelr/dist/theme/vuelr';
```

## Usage

```vue
<template>
  <Vuelr v-model="code" />
</template>

<script>
export default defineComponent({
  setup() {
    const code = ref('<template><p>Hello world!</p></template>');
  }
});
</script>
```

## License

[MIT](https://opensource.org/licenses/MIT)
