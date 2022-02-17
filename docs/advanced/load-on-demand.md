# Load on demand

If you don't want to register the plugin globally, you can also load Vuelr on demand by importing it directly in a component.

When you import the Vuelr component directly, the [default configuration](/vuelr/advanced/configuration#default-configuration) will be used.

```vue
<template>
  <div class="my-component">
    <Vuelr :code="code" />
  </div>
</template>

<script lang="ts">
import { Vuelr } from 'vuelr';

export default defineComponent({
  components: { Vuelr },
  setup() {
    const code = ref('<p>Hello world!</p>');
    return { code };
  }
});
</script>
```
