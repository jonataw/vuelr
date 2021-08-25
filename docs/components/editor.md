# VuelrEditor

VuelrEditor uses [CodeMirror](https://codemirror.net/). If you would like to use a custom editor, see [Custom Editor](/usage/slots#custom-editor).

<VuelrEditor v-model="code" />

```HTML
<VuelrEditor v-model="code" />

<script>
  export default {
    data() {
      return {
        code: `<p>This is just the default editor.</p>`
      }
    }
  }
</script>
```

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class extends Vue {
  code = `<p>This is just the default editor.</p>`;

}
</script>

## Props

<div class="prop_table">

| Name                        | Type           | Default      | Description                  |
| --------------------------- | -------------- | ------------ | ---------------------------- |
| value / v-model <Required/> | <T>string</T>  |              | Current value of editor.     |
| readonly                    | <T>boolean</T> | <T>false</T> | Sets the editor as readonly. |

</div>

## Events

<div class="event_table">

| Event | Arguments | Description                 |
| ----- | --------- | --------------------------- |
| input |           | Emitted when value changes. |

</div>
