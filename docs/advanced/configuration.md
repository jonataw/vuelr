# Configuration

:::warning
This page is not complete.
:::

`createVuelr` allows you to pass options to Vuelr.

```ts
createApp(App)
  .use(
    createVuelr({
      components: [Vuelr],
      config: {
        // - Options here -
      }
    })
  )
  .mount('#app');
```

## Default configuration

@[code{2-8}](../../src/utils/default-config.ts)
