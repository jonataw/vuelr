import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/vuelr/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vuelr',
      description:
        'Vuelr is a component for live rendering Vue.js components and templates in the browser.'
    }
  },

  themeConfig: {
    sidebarDepth: 2,
    repo: 'https://github.com/jonataw/vuelr',
    logo: '/logo.svg',
    locales: {
      '/': {
        sidebar: [
          {
            text: 'Demo',
            link: '/demo.md'
          },
          {
            text: 'Getting Started',
            children: [
              '/getting-started/introduction.md',
              '/getting-started/installation.md',
              '/getting-started/usage.md',
              '/getting-started/security.md'
            ]
          },
          {
            text: 'Advanced',
            children: ['/advanced/configuration.md']
          }
        ]
      }
    }
  }
});
