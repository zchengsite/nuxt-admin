
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/remark/base/css/site.css',
    '@/assets/remark/global/css/bootstrap-extend.css',
    '@/assets/remark/global/css/bootstrap.css',
    '@/assets/remark/global/fonts/web-icons/web-icons.css',
    '@/assets/remark/global/fonts/font-awesome/font-awesome.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  axios: {
    proxy: true,
  },

  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      pathRewrite: {
        '^/api' : '/api',
      },
    },
  },

  router: {
    middleware: ['locale-redirect'],
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
  }
}
