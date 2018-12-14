const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&amp;subset=korean' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
   //loading: { color: '#fff' },
  loading: '@/components/global/Loading.vue',

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/global.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src:'@/plugins/mdb_component.js', ssr: false },
    { src:'@/plugins/filters.js', ssr: false },
    { src:'@/plugins/external_pkg_noSsr.js', ssr: false },
    { src:'@/plugins/vue2_date_picker.js', ssr: false },
    { src:'@/plugins/vue-toasted.js', ssr: false },
    { src:'@/plugins/vue-select.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/moment',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    host: 'dev-api.eostics.io',
    port: '443',
    https: true
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    },
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ]
  }
}
