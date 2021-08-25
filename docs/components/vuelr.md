# Vuelr

The main component of Vuelr.

## Props

<div class="prop_table">

| Name                        | Type          | Default | Description                                                                                                                                                           |
| --------------------------- | ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value / v-model <Required/> | <T>string</T> |         | Current value of Vuelr editor.                                                                                                                            |
| editor                      | <T>object</T> |         | Props to pass to [VuelrEditor](/components/editor). See [VuelrEditor#props](/components/editor#props) for full list of props. Has no effect when using slots.     |
| preview                     | <T>object</T> |         | Props to pass to [VuelrPreview](/components/preview). See [VuelrPreview#props](/components/preview#props) for full list of props. Has no effect when using slots. |

</div>

## Events

<div class="event_table">

| Event | Arguments | Description                 |
| ----- | --------- | --------------------------- |
| input |           | Emitted when value changes. |

</div>

## Slots

| Slot    | Arguments | Description                       |
| ------- | --------- | --------------------------------- |
| default |           | Emitted when the icon is clicked. |
