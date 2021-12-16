# Vuelr

Vuelr is a component for live rendering Vue.js components and templates in the browser.

- [Demo](https://jonataw.github.io/vuelr/demo.html)
- [Documentation](https://jonataw.github.io/vuelr)

## Installation

```sh
# NPM
npm i vuelr

# Yarn
yarn add vuelr
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

## Usage

Please visit the [Documentation](https://jonataw.github.io/vuelr) for more comprehensive instructions.

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

## License

[MIT](https://opensource.org/licenses/MIT)
