# Vuelr

The main component of Vuelr.
<Vuelr v-model="code"  />

<script>
export default {
  data() {
    return {
      code: `<p>Vuelr</p>`
    }
  }
}
</script>

## Props

<div class="prop_table">

| Name            | Type   | Default | Description                                                                                                                                                       |
| --------------- | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value / v-model | string |         | Current value of Vuelr editor.                                                                                                                                    |
| editor          | object |         | Props to pass to [VuelrEditor](/components/editor). See [VuelrEditor#props](/components/editor#props) for full list of props. Has no effect when using slots.     |
| preview         | object |         | Props to pass to [VuelrPreview](/components/preview). See [VuelrPreview#props](/components/preview#props) for full list of props. Has no effect when using slots. |
| error           | object |         | Props to pass to [VuelrError](/components/error). See [VuelrError#props](/components/preview#props) for full list of props. Has no effect when using slots.       |

</div>

## Events

<div class="event_table">

| Event | Arguments | Description                 |
| ----- | --------- | --------------------------- |
| input |           | Emitted when value changes. |

</div>

## Slots

| Slot    | Arguments                                                                                                                                                                                               | Description                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| default |                                                                                                                                                                                                         | Combined arguments of scoped slots. |
| editor  |                                                                                                                                                                                                         |                                     |
| preview | id - The id selector Vuelr is trying to render to.<br/>compiled.script - Rendered script as string.<br/>compiled.template - Rendered template as string.<br/>compiled.style - Rendered style as string. |                                     |
| error   | error - The current error as string                                                                                                                                                                     |                                     |
