import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'Vuelr',
  description: 'Live editing of Vue components',

  lastUpdated: true,
  base: '/vuelr/',

  themeConfig: {
    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/getting-started/introduction' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Usage', link: '/getting-started/usage' },
            { text: 'Security', link: '/getting-started/security' },
          ],
        },
        {
          text: 'Demo',
          link: '/demo'
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/jonataw/vuelr/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/jonataw/vuelr' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present Jonatan Wackström',
    },
  },
});
