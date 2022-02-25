# Configuration

:::warning
This page is not complete.
:::

`createVuelr` allows you to pass options to Vuelr.

```ts
createApp(App)
  .use(
    createVuelr({
      config: {
        // - Options here -
      }
    })
  )
  .mount('#app');
```

## Default configuration

```ts
debug: false,
targetClassName: 'target',
editorClassName: 'editor',
styleClassName: 'style',
errorClassName: 'error'
```
