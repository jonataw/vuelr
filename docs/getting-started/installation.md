# Installation

Vue is a peer dependency of Vuelr. Vuelr requires Vue `^3.0.0`. 

Vuelr is available as an [npm package](https://www.npmjs.com/package/vuelr).

::: code-group

```bash [npm]
npm install vuelr
```

```bash [pnpm]
pnpm add vuelr
```

```bash [yarn]
yarn add vuelr
```

::::


The `createVuelr` function returns a plugin object that can be passed to
`app.use`. The plugin registers the `<Vuelr>` component globally to your app.

```ts
import { createApp } from 'vue';
import { createVuelr } from 'vuelr';

createApp(App)
  .use(createVuelr())
  .mount('#app');
```


You can also import the `<Vuelr>` component itself:
  
```ts
import { Vuelr } from 'vuelr';

defineComponent({
  components: {
    Vuelr,
  },
});
```

