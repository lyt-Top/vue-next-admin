const { description } = require('../../package')

module.exports = {
  devServer: {
    open: true
  },
  host: "localhost",
  port: 8085,
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'vue-admin-wonderful-next-docs',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
	smoothScroll: true,
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: '指南',
        link: '/guide/',
      },
      {
        text: '配置',
        link: '/config/'
      },
      {
        text: '主题',
        link: '/theme/'
      },
      {
        text: '更新记录',
        link: '/update/'
      },
      {
        text: 'vsCode',
        link: '/vsCode/'
      },
      {
        text: '代码仓库',
        items: [
          {
            text: 'github（国外）',
            items: [
              {
                text: 'vue-admin-wonderful（2.x版本）',
                link: '11'
              },
              {
                text: 'vue-admin-wonderful-next（3.x版本）',
                link: '12'
              }
            ]
          },
          {
            text: 'gitee（国内）',
            items: [
              {
                text: 'vue-admin-wonderful（2.x版本）',
                link: '13'
              },
              {
                text: 'vue-admin-wonderful-next（3.x版本）',
                link: '14'
              }
            ]
          }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ],
	  '/config/': [
	    {
	      title: '配置',
	      collapsable: false,
	      children: [
          '',
          'other'
	      ]
	    }
	  ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
