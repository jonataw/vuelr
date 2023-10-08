import {
  App,
  PropType,
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
} from 'vue';
import { match } from '../../common/match';
import { minifyCSS } from '../../common/minify';
import { useVuelr } from '../../composables/useVuelr';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createApp } from 'vue/dist/vue.esm-bundler';

const TEMPLATE_REGEXP = /<template>([\s\S]*)<\/template>/;
const SCRIPT_REGEXP = /<script>([\s\S]*)<\/script>/;
const STYLE_REGEXP = /<style>([\s\S]*)<\/style>/;

export const Vuelr = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Vuelr',
  props: {
    id: {
      type: String as PropType<string>,
      default: undefined,
    },
    code: {
      type: String as PropType<string>,
      default: undefined,
    },
    scoped: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  inheritAttrs: false,
  setup(props) {
    const attrs = useAttrs();
    const slots = useSlots();
    const { options, uuid } = useVuelr();

    const instance = getCurrentInstance();
    const id = props.id || uuid();

    const elements = {
      target: `${id}_target`,
      style: `${id}_style,`,
    };

    const iteration = ref(0);
    const error = ref<string | null>(null);

    const script = ref<string | null>(null);
    const template = ref<string | null>(null);
    const style = ref<string | null>(null);

    const code = computed<string>(() => props.code || '');

    let app: App<Element> | null = null;

    /**
     * Returns true if running in browser.
     */
    const isClient = () => typeof window !== 'undefined';

    onMounted(() => {
      if (isClient()) {
        nextTick(() => {
          watch(() => [code.value], update, { immediate: true });
        });
      }
    });

    /**
     * Called on every code change.
     */
    const update = (): void => {
      error.value = null;
      iteration.value++;

      createScript();
      createStyle();

      render();
    };

    /**
     * Crea
     */
    const createScript = () => {
      let js = (match(SCRIPT_REGEXP, code.value) || '').trim();
      if (js) {
        js = (';options = ' + js + ';').replace('export default', '');
        script.value = js;
      } else {
        script.value = null;
      }
    };

    const createStyle = () => {
      const scope = (style: string, scope: string): string => {
        if (!scope) {
          return style;
        }
        const regex = /(^|\})\s*([^{]+)/g;
        return style.trim().replace(regex, (_m, g1, g2) => {
          return g1 ? `${g1} #${scope} ${g2}` : `#${scope} ${g2}`;
        });
      };

      const root = document.getElementById(id);

      if (root) {
        let styleElement = document.getElementById(elements.style);

        if (styleElement) {
          // Style element already exists. Remove content of it.
          styleElement.innerHTML = '';
        } else {
          // Create the style element.
          styleElement = document.createElement('div');

          styleElement.id = elements.style;
          styleElement.setAttribute(
            'style',
            'display: none; position: fixed; top: 0; left: 0;',
          );

          // Add style element to root element.
          root.appendChild(styleElement);
        }

        // Create a fake DOM element to hold the styles.
        const dom = document.createElement('div');
        dom.innerHTML = code.value;

        // Extract styles from the DOM element.
        const styles = Array.prototype.slice
          .call(dom.querySelectorAll('style'))
          .map((n) => n.innerHTML);

        let style = styles ? styles.join(' ') : '';

        if (props.scoped) {
          style = scope(style, `${id} #${elements.target}`);
        }

        if (style) {
          const holder = document.createElement('style');
          holder.innerText = minifyCSS(style);
          styleElement.appendChild(holder);
        }
      }
    };

    watch(
      () => error.value,
      () => {
        if (options.value.debug && error.value) console.error(error.value);
      },
    );

    const render = (): void => {
      let template = (match(TEMPLATE_REGEXP, code.value) || '').trim();

      if (!template) {
        // <template> tags not found... Strip all script and style tags!
        template = code.value;
        while (SCRIPT_REGEXP.test(template)) {
          template = template.replace(SCRIPT_REGEXP, '');
        }
        while (STYLE_REGEXP.test(template)) {
          template = template.replace(STYLE_REGEXP, '');
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-const
      let options: any = {};

      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        eval(`${script.value}`);
      } catch (_error) {
        error.value = 'Error compiling script.';
        console.warn(_error);
        return;
      }

      if (!options.render) {
        options.template = `${options.template || template}`;
      }

      try {
        if (app) app.unmount();

        const target = document.getElementById(elements.target);

        if (target) {
          app = createApp(defineComponent({ ...options }), {}) as App<Element>;

          if (app) {
            // Install inherited components.
            Object.entries(instance?.appContext.components || {}).forEach(
              ([name, component]) => {
                app?.component(name, component);
              },
            );

            // Install inherited directives.
            Object.entries(instance?.appContext.directives || {}).forEach(
              ([name, directive]) => {
                app?.directive(name, directive);
              },
            );

            // Mount the component.
            app.mount(target);
          }
        } else {
          error.value = `Unable to render component. Element with id '${id}' not found in DOM.`;
        }
      } catch (error) {
        console.error(error);
      }
    };

    return () => (
      <div id={id} {...attrs}>
        {slots.default?.({
          target: elements.target,
          iteration: iteration.value,
          error: error.value,
          compiled: {
            template: template.value,
            script: script.value,
            style: style.value,
          },
        })}
      </div>
    );
  },
});
