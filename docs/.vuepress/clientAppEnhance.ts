import { defineClientAppEnhance } from '@vuepress/client';

import { createVuelr, Vuelr } from '../../src';

export default defineClientAppEnhance(({ app, router, siteData }) => {
  router.addRoute({ path: '/', redirect: '/getting-started/introduction.html' });
  app.use(
    createVuelr({
      components: [Vuelr]
    })
  );
});
