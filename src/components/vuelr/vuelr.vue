<template>
  <div
    v-if="ready && hasSlot('default')"
    :id="target"
    :class="`${target}-slot`"
  >
    <slot
      :target="TARGET_ID"
      :iteration="iteration"
      :error="error"
      :compiled="{
        script: compiledScript,
        template: compiledTemplate,
        style: compiledStyle
      }"
    />
  </div>
  <div v-else-if="ready" :id="target">
    <div :id="TARGET_ID" />
    <div v-if="error" v-text="error" />
    <textarea
      :id="EDITOR_ID"
      v-model="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
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
  getCurrentInstance,
  computed
} from 'vue';
// @ts-ignore
import { createApp } from 'vue/dist/vue.esm-bundler';

import { useVuelr } from '../../composables/use-vuelr';

export default defineComponent({
  name: 'Vuelr',
  props: {
    id: String,
    modelValue: {
      type: String as PropType<string>
    },
    code: {
      type: String as PropType<string>
    },
    scoped: {
      type: Boolean,
      default: true
    }
  },
  setup(props, _context) {
    const { config, uuid } = useVuelr();
    const instance = getCurrentInstance();

    const isServer = () => typeof window === 'undefined';

    const ready = ref(false);
    const error = ref<string | null>(null);
    const iteration = ref(0);
    const target = props.id || uuid();

    const compiledScript = ref<string | null>(null);
    const compiledTemplate = ref<string | null>(null);
    const compiledStyle = ref<string | null>(null);

    let app: any;

    const TEMPLATE_REGEXP = /<template>([\s\S]*)<\/template>/;
    const SCRIPT_REGEXP = /<script>([\s\S]*)<\/script>/;
    const STYLE_REGEXP = /<style>([\s\S]*)<\/style>/;

    const parseConfig = () => {
      const classNames = config.value.classNames;
      const TARGET_ID = `${target}-${classNames.target}`;
      const EDITOR_ID = `${target}-${classNames.editor}`;
      const STYLE_ID = `${target}-${classNames.style}`;
      const ERROR_ID = `${target}-${classNames.error}`;

      return {
        TARGET_ID,
        EDITOR_ID,
        STYLE_ID,
        ERROR_ID
      };
    };

    const code = computed<string>(
      () => props.code || (props.modelValue as string)
    );

    const { TARGET_ID, EDITOR_ID, STYLE_ID, ERROR_ID } = parseConfig();

    const match = (regex: RegExp, text: string): string => {
      return (regex.exec(text) || [])[1];
    };

    onMounted(() => {
      if (isServer()) return;
      ready.value = true;
      nextTick(() => {
        watch(() => [code.value], update, { immediate: true });
      });
    });

    const update = (): void => {
      iteration.value++;
      error.value = null;
      createScript();
      createStyle();
      render();
    };

    const createScript = () => {
      let js = (match(SCRIPT_REGEXP, code.value) || '').trim();
      if (!js) {
        return (compiledScript.value = null);
      }
      js = (';options = ' + js + ';').replace('export default', '');
      compiledScript.value = js;
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

      const root = document.getElementById(target);
      if (!root) {
        return;
      }
      let styleElement = document.getElementById(STYLE_ID);
      if (styleElement) {
        // Style element already exists. Remove content of it.
        styleElement.innerHTML = '';
      } else {
        // Create the style element.
        styleElement = document.createElement('div');
        styleElement.id = STYLE_ID;
        styleElement.style = 'display: none; position: fixed; top: 0; left: 0;';
        // Add style element to root element.
        root.appendChild(styleElement);
      }
      const dom = document.createElement('div');
      dom.innerHTML = code.value;
      const styles = Array.prototype.slice
        .call(dom.querySelectorAll('style'))
        .map((n) => n.innerHTML);

      let style = styles ? styles.join(' ') : '';

      if (props.scoped) {
        style = addStyleScope(style, target + ` #${TARGET_ID}`);
      }
      if (style) {
        const holder = document.createElement('style');
        holder.innerText = minifyCSS(style);
        styleElement.appendChild(holder);
      }
    };

    const render = (): void => {
      const js = compiledScript.value;
      let html = (match(TEMPLATE_REGEXP, code.value) || '').trim();
      if (!html) {
        // <template> tags not found... Strip all script and style tags!
        html = code.value;
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
        if (app) {
          app.unmount();
        }

        const el = document.getElementById(TARGET_ID);
        if (!el) {
          error.value = `Unable to render component. Element with id '${target}' not found in DOM.`;
          return;
        }
        el.id = TARGET_ID;

        app = createApp(defineComponent({ ...options }), {});

        // Install inherited components.
        Object.entries(instance?.appContext.components || {}).forEach(
          ([name, component]) => {
            app.component(name, component);
          }
        );

        // Install inherited directives.
        Object.entries(instance?.appContext.directives || {}).forEach(
          ([name, directive]) => {
            app.component(name, directive);
          }
        );

        // Mount the component.
        app.mount(el);
      } catch (error) {
        console.error(error);
      }
    };

    const hasSlot = (name: string) => {
      return instance && instance.slots[name];
    };

    const minifyCSS = (style: string) => {
      let content = style;
      content = content.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
      // now all comments, newlines and tabs have been removed
      content = content.replace(/ {2,}/g, ' ');
      // now there are no more than single adjacent spaces left
      // now unnecessary: content = content.replace( /(\s)+\./g, ' .' );
      content = content.replace(/ ([{:}]) /g, '$1');
      content = content.replace(/([;,]) /g, '$1');
      content = content.replace(/ !/g, '!');
      return content;
    };

    return {
      ready,
      target,
      compiledStyle,
      compiledScript,
      compiledTemplate,
      hasSlot,
      error,
      config,
      iteration,
      EDITOR_ID,
      TARGET_ID,
      ERROR_ID
    };
  }
});
</script>
