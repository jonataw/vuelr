<template>
  <div v-if="ready">
    <div v-if="$slots.default || $scopedSlots.default" class="vuelr vuelr-slot">
      <slot
        :id="id"
        :error="error"
        :compiled="{
          script: compiledScript,
          template: compiledTemplate,
          style: compiledStyle
        }"
      />
    </div>
    <div v-else class="vuelr">
      <slot
        v-if="$scopedSlots.preview"
        name="preview"
        :id="id"
        :compiled="{
          script: compiledScript,
          template: compiledTemplate,
          style: compiledStyle
        }"
      />
      <VuelrPreview v-else :id="id" />

      <slot v-if="$scopedSlots.error" name="error" :error="error" />
      <VuelrError v-else :error="error" />

      <slot v-if="$scopedSlots.editor" name="editor" />
      <VuelrEditor
        v-else
        :value="value"
        :readonly="editorProps && editorProps.readonly"
        @input="(e) => $emit('input', e)"
      />
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _Vue from 'vue/dist/vue.common';
import { Component, Prop, Vue } from '@/utils/decorators';
import needsTranspiler from '@/utils/needs-transpiler';
import { VuelrConfig } from '@/vuelr.d';

@Component({
  name: 'Vuelr'
})
export default class Vuelr extends Vue {
  @Prop({ type: String }) readonly value?: any;
  @Prop({ type: Boolean, default: false }) readonly keepData?: boolean;

  @Prop({ type: Boolean, default: true }) readonly scoped!: boolean;
  @Prop({ type: Boolean, default: false }) readonly debug!: boolean;

  @Prop({ type: Object }) readonly editorProps?: { readonly: boolean };

  @Prop({ type: Object }) readonly previewProps?: unknown; // Unused
  @Prop({ type: Object }) readonly errorProps?: unknown; // Unused

  vm: Vue | null = null;
  id: string;
  error: string | null = null;
  transpiler: (code: string) => string = (code: string) => code;
  iteration = 0; // Watcher immediate will set this to 1 instantly.
  ready = false;

  compiledScript: string | null = null;
  compiledTemplate: string | null = null;
  compiledStyle: string | null = null;

  readonly TEMPLATE_REGEXP = /<template>([\s\S]*)<\/template>/;
  readonly SCRIPT_REGEXP = /<script>([\s\S]*)<\/script>/;
  readonly STYLE_REGEXP = /<style>([\s\S]*)<\/style>/;

  get config(): VuelrConfig {
    return this.$vuelr.config;
  }

  destroyed(): void {
    this.destroy();
  }

  createId(): number {
    this.$vuelr.uuidSequence++;
    return this.$vuelr.uuidSequence;
  }

  created(): void {
    this.id = `vuelr-${this.createId()}`;
  }

  mounted(): void {
    if (this.$isServer) {
      return;
    }
    if (needsTranspiler) {
      this.$nextTick(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        import(
          '../../utils/transpile' /* webpackChunkName: "transpile" */
        ).then((module) => {
          this.transpiler = module.default || module;

          this.ready = true;
          this.$nextTick(() => {
            this.addWatchers();
          });
        });
      });
    } else {
      this.ready = true;
      this.$nextTick(() => {
        this.addWatchers();
      });
    }
  }

  addWatchers(): void {
    this.$watch('value', this.onUpdate, { immediate: true });
  }

  onUpdate(): void {
    this.iteration++;
    this.error = null;
    this.transpile();
    this.style();
    this.refresh();
  }

  style(): void {
    const rootElement = document.getElementById(this.id);
    if (!rootElement) {
      return;
    }

    let styleElement;
    styleElement = rootElement.getElementsByClassName('vuelr-style')[0];
    if (styleElement) {
      // Style element already exists. Remove content of it.
      styleElement.innerHTML = '';
    } else {
      // Create the style element.
      styleElement = document.createElement('div');
      styleElement.classList.add('vuelr-style');

      // Add style element to root element.
      rootElement.appendChild(styleElement);
    }

    const dom = document.createElement('div');
    dom.innerHTML = this.value;
    const styles = Array.prototype.slice
      .call(dom.querySelectorAll('style'))
      .map((n) => n.innerHTML);

    this.compiledStyle = styles ? styles.join(' ') : '';

    if (this.scoped) {
      this.compiledStyle = this.addStyleScope(this.compiledStyle, this.id);
    }

    if (this.compiledStyle) {
      const holder = document.createElement('style');
      holder.innerText = minimizeData(this.compiledStyle);
      if (styleElement) {
        styleElement.appendChild(holder);
      }
    }
  }

  addStyleScope(style: string, scope: string): string {
    if (!scope) {
      return style;
    }
    const regex = /(^|\})\s*([^{]+)/g;
    return style.trim().replace(regex, (_m, g1, g2) => {
      return g1 ? `${g1} #${scope} ${g2}` : `#${scope} ${g2}`;
    });
  }

  transpile(): void {
    let js = (this.match(this.SCRIPT_REGEXP, this.value) || '').trim();

    if (!js) {
      this.compiledScript = null;
      return;
    }

    // Remove "export default".
    if (js.includes('export default')) {
      js = js.replace('export default', '');
    }

    try {
      this.compiledScript = this.transpiler(';options = ' + js + ';');
    } catch (error) {
      this.compiledScript = null;
      window.console.error('Error in javascript', error);
    }
  }

  refresh(): void {
    this.destroy();
    const js = this.compiledScript;
    let html = (this.match(this.TEMPLATE_REGEXP, this.value) || '').trim();

    if (!html) {
      // <template> tags not found... Strip all script and style tags!
      html = this.value;

      while (this.SCRIPT_REGEXP.test(html)) {
        html = html.replace(this.SCRIPT_REGEXP, '');
      }
      while (this.STYLE_REGEXP.test(html)) {
        html = html.replace(this.STYLE_REGEXP, '');
      }
    }

    let options: any = {};

    try {
      eval(`var console = this.console; ${js}`);
    } catch (error) {
      this.error = error;
      return;
    }

    if (!options.render) {
      options.template = `<div class="vuelr-dynamic">${
        options.template || html
      }</div>`;
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    try {
      const rootElement = document.getElementById(this.id);
      if (!rootElement) {
        this.error = `Unable to render component. Element with id '${this.id}' not found in DOM.`;
        return;
      }
      const dynamic = document.createElement('div');
      rootElement.appendChild(dynamic);
      this.vm = new _Vue({
        ...options,
        el: dynamic,
        parent: new _Vue({
          errorCaptured(error: any, _vm: any, info: any) {
            // https://vuejs.org/v2/api/#errorCaptured
            // Pass error to playground error handler
            console.error(error, info);
            // playground.errHandler(err, info);
            // Don't propagate to parent/global error handler!
            return false;
          },
          template: '<span></span>'
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  destroy(): void {
    try {
      const vm = this.vm;
      if (vm) {
        const parent = vm.$parent;
        vm.$destroy();
        vm.$el.parentNode?.removeChild(vm.$el);
        vm.$el.innerHTML = '';
        parent.$destroy();
      }
      this.vm = null;
    } catch (error) {
      console.warn(error);
    }
  }

  match(regex: RegExp, text: string): string {
    return (regex.exec(text) || [])[1];
  }
}

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
