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

```ts
debug: false,
classNames: {
  target: 'target',
  editor: 'editor',
  style: 'style',
  error: 'error'
}
```
