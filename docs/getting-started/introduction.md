# Introduction

Vuelr allows you to edit and preview Vue components in realtime.

## Installation (npm)

To use Vuelr in your project, run the following command in your project folder:

```sh
npm i vuelr
# yarn add vuelr
```

Import Vuelr in your Vue entry file:

```ts
import { createApp } from 'vue';
import { createVuelr, Vuelr } from 'vuelr';

createApp(App)
  .use(
    createVuelr({
      components: [Vuelr],
    })
  )
  .mount('#app');
```

## Stylesheet

Import the `vuelr.scss` file with Sass:

```scss
@import 'vuelr/dist/theme/vuelr';
```
