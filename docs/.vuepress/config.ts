import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/vuelr/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vuelr',
      description: 'Vue-powered Static Site Generator'
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
            text: 'Getting Started',
            children: [
              '/getting-started/introduction.md',
              '/getting-started/demo.md',
              '/getting-started/nuxt.md'
            ]
          },
          {
            text: 'Configuration',
            children: ['/configuration/global-configuration.md']
          },
          {
            text: 'Components',
            children: [
              '/components/vuelr.md',
              '/components/editor.md',
              '/components/preview.md',
              '/components/error.md'
            ]
          }
        ]
      }
    }
  }
});
