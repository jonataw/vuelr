# Quickstart

The following snippet will render a Vuelr component similar to the one found in [Demo](/demo).

<SourceCode lang="Vue">
```html
<template>
  <Vuelr v-model="code" />
</template>

<script>
  export default {
    data() {
      return {
        code: ''
      }
    }
  }
</script>
```
</SourceCode>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class extends Vue {
  code = '';
}
</script>
