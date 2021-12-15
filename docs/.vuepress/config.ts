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
              '/getting-started/installation.md',
              '/getting-started/demo.md',
              '/getting-started/nuxt.md',
              '/getting-started/usage.md'
            ]
          },
          {
            text: 'Configuration',
            children: ['/configuration/global-configuration.md']
          }
        ]
      }
    }
  }
});
