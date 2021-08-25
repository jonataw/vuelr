# Demo

Try editing the code below and see the preview above change in real-time!

<Vuelr v-model="code" />

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class extends Vue {
  code = `<template>
  <div>
    <p>Hello from {{name}}!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Vuelr' 
    }
  }
}
<\/script>

<style>
p {
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 500;
  color: #78b064;
}
<\/style>`;

}
</script>
