import { defineClientAppEnhance } from '@vuepress/client';
import A from './components/A.vue';
import T from './components/T.vue';
import ExampleCodeMirror from './components/examples/CodeMirror.vue';
import { createVuelr, Vuelr } from '../../src';

export default defineClientAppEnhance(({ app, router }) => {
  router.addRoute({
    path: '/',
    redirect: '/getting-started/introduction.html'
  });

  app.component('A', A);
  app.component('T', T);
  app.component('ExampleCodeMirror', ExampleCodeMirror);

  app.use(
    createVuelr({
      components: [Vuelr]
    })
  );
});
