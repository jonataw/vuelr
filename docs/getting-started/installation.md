# Installation

Vuelr supports Vue.js version `>3.0.0`.

To use Vuelr in your project, run the following command in your project folder:

<CodeGroup>
  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install vuelr
```

  </CodeGroupItem>
  <CodeGroupItem title="Yarn">
  
```bash:no-line-numbers
yarn add vuelr
```

  </CodeGroupItem>
</CodeGroup>

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

## Nuxt

Vuelr supports Nuxt.js version `>3.0.0`.

Add `plugins/vuelr.ts` to you project with the following content:

```ts
import { defineNuxtPlugin } from '#app';
import { createVuelr, Vuelr } from 'vuelr';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createVuelr({
      components: [Vuelr]
    })
  );
});
```

::: tip
All plugins in your `plugins/` directory are auto-registered.
:::
