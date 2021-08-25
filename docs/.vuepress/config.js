const path = require('path');

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Vuelr',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'Documentation for Vuelr.',

  base: '/vuelr/',

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src')
      }
    }
  },

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#2e84f5' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/jonataw/vuelr',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: 'Improve this page!',
    lastUpdated: true,
    nav: [
      {
        text: 'Demo',
        link: '/demo'
      },
      {
        text: 'Get Started',
        link: '/get-started/installation'
      },
      {
        text: 'Configuration',
        link: '/configuration/default-configuration'
      },
      {
        text: 'Usage',
        link: '/usage/quickstart'
      }
    ],
    searchPlaceholder: 'Search...',
    sidebarDepth: 4,
    sidebar: [
      '/demo',
      {
        title: 'Get Started',
        collapsable: false,
        sidebarDepth: 3,
        children: ['/get-started/installation', 'get-started/configuration']
      },
      {
        title: 'Usage',
        children: ['/usage/quickstart', '/usage/slots', '/usage/es6'],
        collapsable: false,
        sidebarDepth: 3
      },
      {
        title: 'Components',
        collapsable: false,
        sidebarDepth: 3,
        children: [
          '/components/vuelr',
          '/components/editor',
          '/components/preview',
          '/components/error'
        ]
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/last-updated',
    'vuepress-plugin-typescript'
  ]
};
