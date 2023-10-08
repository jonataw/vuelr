# Vuelr

[![npm](https://img.shields.io/npm/v/vuelr.svg)](https://www.npmjs.com/package/vuelr)
[![license](https://img.shields.io/npm/l/vuelr.svg)](https://github.com/jonataw/vuelr/blob/HEAD/LICENSE)
[![downloads](https://img.shields.io/npm/dt/vuelr)](https://www.npmjs.com/package/vuelr)

Vuelr is a component for live rendering Vue.js components and templates in the browser.

[Demo](https://jonataw.github.io/vuelr/demo.html) | [Documentation](https://jonataw.github.io/vuelr)

## Installation

Vuelr is available as an [npm package](https://www.npmjs.com/package/vuelr).

```bash
npm install vuelr
```

Import Vuelr in your Vue entry file:

```ts
import { createApp } from 'vue';
import { createVuelr } from 'vuelr';

createApp(App).use(createVuelr()).mount('#app');
```

## Usage

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
      code: ref('<p>Hello world!</p>'),
    };
  },
});
</script>
```

## License

This project is licensed under the [MIT](https://www.npmjs.com/package/vuelr) license.
