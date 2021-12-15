# Usage

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

## Props

<div class="prop_table">

| Name            | Type   | Default | Description                    |
| --------------- | ------ | ------- | ------------------------------ |
| value / v-model | string |         | Current value of Vuelr editor. |

</div>

## Events

<div class="event_table">

| Event | Arguments | Description                 |
| ----- | --------- | --------------------------- |
| input |           | Emitted when value changes. |

</div>

## Slots

| Slot    | Arguments | Description                         |
| ------- | --------- | ----------------------------------- |
| default |           | Combined arguments of scoped slots. |
