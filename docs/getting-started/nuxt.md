# Nuxt

Vuelr supports Nuxt.js `>3.0.0`.

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
