<template>
  <div v-if="ready" :id="uid">
    <div
      v-if="hasSlot('default')"
      :class="[config.className, `${config.className}-slot`]"
    >
      <slot
        :id="slotId"
        :error="error"
        :compiled="{
          script: compiledScript,
          template: compiledTemplate,
          style: compiledStyle
        }"
      />
    </div>
    <div v-else :class="config.className">
      <div :id="slotId" />
      <div v-if="error" v-text="error" />
      <textarea
        v-model="modelValue"
        :readonly="editorProps && editorProps.readonly"
        @input="$emit('update:modelValue', $event.target?.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  nextTick,
  ref,
  watch,
  PropType,
  getCurrentInstance
} from 'vue';
// @ts-ignore
import { createApp } from 'vue/dist/vue.esm-bundler';

import { useVuelr } from '../../composables/use-vuelr';

export default defineComponent({
  name: 'Vuelr',
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true
    },
    scoped: {
      type: Boolean,
      default: true
    },
    editorProps: Object,
    errorProps: Object,
    previewProps: Object,
    id: String
  },
  setup(props, _context) {
    const { config } = useVuelr();
    const instance = getCurrentInstance();

    const isServer = () => typeof window === 'undefined';

    const ready = ref(false);
    const error = ref<string | null>(null);
    const iteration = ref(0);
    let transpiler: any = (code: string) => code;

    const { uuid } = useVuelr();
    const uid = props.id || `${config.value.className}-${uuid()}`;
    const slotId = `${uid}-preview`;

    const compiledScript = ref<string | null>(null);
    const compiledTemplate = ref<string | null>(null);
    const compiledStyle = ref<string | null>(null);

    const TEMPLATE_REGEXP = /<template>([\s\S]*)<\/template>/;
    const SCRIPT_REGEXP = /<script>([\s\S]*)<\/script>/;
    const STYLE_REGEXP = /<style>([\s\S]*)<\/style>/;

    onMounted(() => {
      if (isServer()) return;
      ready.value = true;
      nextTick(() => {
        watch(() => [props.modelValue], update, { immediate: true });
      });
    });

    const update = (): void => {
      iteration.value++;
      error.value = null;
      transpile();
      createStyle();
      refresh();
    };

    const match = (regex: RegExp, text: string): string => {
      return (regex.exec(text) || [])[1];
    };

    const transpile = () => {
      let js = (match(SCRIPT_REGEXP, props.modelValue) || '').trim();
      if (!js) {
        compiledScript.value = null;
        return;
      }
      // Remove "export default".
      if (js.includes('export default')) {
        js = js.replace('export default', '');
      }
      try {
        compiledScript.value = transpiler(';options = ' + js + ';');
      } catch (error) {
        compiledScript.value = null;
        window.console.error('Error in javascript', error);
      }
    };

    const createStyle = () => {
      const addStyleScope = (style: string, scope: string): string => {
        if (!scope) {
          return style;
        }
        const regex = /(^|\})\s*([^{]+)/g;
        return style.trim().replace(regex, (_m, g1, g2) => {
          return g1 ? `${g1} #${scope} ${g2}` : `#${scope} ${g2}`;
        });
      };

      const rootElement = document.getElementById(uid);
      if (!rootElement) {
        return;
      }
      let styleElement;
      styleElement = rootElement.getElementsByClassName(
        `${config.value.className}-style`
      )[0];
      if (styleElement) {
        // Style element already exists. Remove content of it.
        styleElement.innerHTML = '';
      } else {
        // Create the style element.
        styleElement = document.createElement('div');
        styleElement.classList.add(`${config.value.className}-style`);
        // Add style element to root element.
        rootElement.appendChild(styleElement);
      }
      const dom = document.createElement('div');
      dom.innerHTML = props.modelValue;
      const styles = Array.prototype.slice
        .call(dom.querySelectorAll('style'))
        .map((n) => n.innerHTML);
      compiledStyle.value = styles ? styles.join(' ') : '';
      if (props.scoped) {
        compiledStyle.value = addStyleScope(
          compiledStyle.value,
          uid + ` .${config.value.className}-preview`
        );
      }
      if (compiledStyle.value) {
        const holder = document.createElement('style');
        holder.innerText = minimizeData(compiledStyle.value);
        if (styleElement) {
          styleElement.appendChild(holder);
        }
      }
    };

    const destroy = (): void => {
      try {
        const rootElement = document.getElementById(uid);
        if (rootElement) {
          const dynamic = rootElement.getElementsByClassName(
            `${config.value.className}-dynamic`
          )[0];
          if (dynamic) {
            dynamic.remove();
          }
        }
      } catch (error) {
        console.warn(error);
      }
    };

    const refresh = (): void => {
      destroy();
      const js = compiledScript.value;
      let html = (match(TEMPLATE_REGEXP, props.modelValue) || '').trim();
      if (!html) {
        // <template> tags not found... Strip all script and style tags!
        html = props.modelValue;
        while (SCRIPT_REGEXP.test(html)) {
          html = html.replace(SCRIPT_REGEXP, '');
        }
        while (STYLE_REGEXP.test(html)) {
          html = html.replace(STYLE_REGEXP, '');
        }
      }
      let options: any = {};
      try {
        eval(`${js}`);
      } catch (_error) {
        error.value = _error as any;
        return;
      }
      if (!options.render) {
        options.template = `${options.template || html}`;
      }
      try {
        const rootElement = document.getElementById(`${uid}-preview`);
        if (!rootElement) {
          error.value = `Unable to render component. Element with id '${uid}' not found in DOM.`;
          return;
        }
        const dynamic = document.createElement('div');
        rootElement.appendChild(dynamic);
        dynamic.className = `${config.value.className}-dynamic`;

        const app = createApp(defineComponent({ ...options }), {});
        Object.entries(instance?.appContext.components).forEach(([a, b]) => {
          app.component(a, b);
        });

        app.mount(dynamic);
      } catch (error) {
        console.error(error);
      }
    };

    const hasSlot = (name: string) => {
      return instance && instance.slots[name];
    };

    return {
      ready,
      uid,
      compiledStyle,
      compiledScript,
      compiledTemplate,
      hasSlot,
      error,
      config,
      slotId
    };
  }
});

function minimizeData(_content: string) {
  var content = _content;
  content = content.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
  // now all comments, newlines and tabs have been removed
  content = content.replace(/ {2,}/g, ' ');
  // now there are no more than single adjacent spaces left
  // now unnecessary: content = content.replace( /(\s)+\./g, ' .' );
  content = content.replace(/ ([{:}]) /g, '$1');
  content = content.replace(/([;,]) /g, '$1');
  content = content.replace(/ !/g, '!');
  return content;
}
</script>
