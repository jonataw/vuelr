# Vuelr

The main component of Vuelr.

```HTML
<Vuelr v-model="code" />

<script>
export default {
  data() {
    return {
      code: `<p>Vuelr</p>`
    }
  }
}
</script>
```

## Props

<div class="prop_table">

| Name                        | Type          | Default | Description                                                                                                                                                       |
| --------------------------- | ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value / v-model <Required/> | <T>string</T> |         | Current value of Vuelr editor.                                                                                                                                    |
| editor                      | <T>object</T> |         | Props to pass to [VuelrEditor](/components/editor). See [VuelrEditor#props](/components/editor#props) for full list of props. Has no effect when using slots.     |
| preview                     | <T>object</T> |         | Props to pass to [VuelrPreview](/components/preview). See [VuelrPreview#props](/components/preview#props) for full list of props. Has no effect when using slots. |
| error                       | <T>object</T> |         | Props to pass to [VuelrError](/components/error). See [VuelrError#props](/components/preview#props) for full list of props. Has no effect when using slots.       |

</div>

## Events

<div class="event_table">

| Event | Arguments | Description                 |
| ----- | --------- | --------------------------- |
| input |           | Emitted when value changes. |

</div>

## Slots

| Slot    | Arguments                                                                                                                                                                                                                           | Description                         |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| default |                                                                                                                                                                                                                                     | Combined arguments of scoped slots. |
| editor  |                                                                                                                                                                                                                                     |                                     |
| preview | <T>id</T> - The id selector Vuelr is trying to render to.<br/><T>compiled.script</T> - Rendered script as string.<br/><T>compiled.template</T> - Rendered template as string.<br/><T>compiled.style</T> - Rendered style as string. |                                     |
| error   | <T>error</T> - The current error as string                                                                                                                                                                                          |                                     |
