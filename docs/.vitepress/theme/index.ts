import { EnhanceAppContext } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { createVuelr } from '../../../dist/vuelr.mjs';

// @ts-ignore
import Demo from '../components/Demo.vue';

export default {
  ...DefaultTheme,
  enhanceApp(context: EnhanceAppContext) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(context);

    context.app.use(createVuelr({ config: { debug: true } }));

    context.app.component('Demo', Demo);
  },
};
