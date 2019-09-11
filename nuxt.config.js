/*!------------------------------------------------------------------
 * Copyright 2019 Reindeer Technology Pte. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*-------------------------------------------------------------------*/
const pkg = require('./package')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const axios = require('axios')

module.exports = {
  mode: 'spa',
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
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'https://reindeer.tech/assets/img/reindeerfavicon.png' },
      { rel: 'icon', type: 'image/x-icon', href: 'https://reindeer.tech/assets/img/reindeerfavicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  transition: {
    name: 'layout',
    mode: 'out-in',
  },
  loadingIndicator: {
	name: 'folding-cube',
	color: '#5C6BC0',
	background: '#E8EAF6'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { 
	color: '#b3d4fc',
	height: '5px'
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    '~/assets/iconACF/style.css',
    '~/assets/iconGDM/style.css',
    '~/assets/iconReindeer/style.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/localStorage.js',
    '@/plugins/vuetify',
    '@/plugins/reindeerSchemaCDD.js',
    '@/plugins/reindeerSchemaCDDSnippet.js',
    '@/plugins/actorModelCDD.js',
    '@/plugins/contextModelCDD.js',
    '@/plugins/authorModelCDD.js',
    '@/plugins/resourceModelACF.js',
    '@/plugins/resourceMasterACF.js',
    '@/plugins/resourceModelGDM.js',
    '@/plugins/resourceMasterGDM.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/google-analytics', {id: 'UA-119014319-3'}],
    ['nuxt-i18n', {
      locales: [
        { code: 'ar',iso: 'n/a', name:'العربية'},
        { code: 'cs',iso: 'n/a', name:'čeština,'},
        { code: 'da',iso: 'n/a', name:'dansk'},
        { code: 'de',iso: 'n/a', name:'Deutsch'},
        { code: 'el',iso: 'n/a', name:'ελληνικά'},
        { code: 'en',iso: 'n/a', name:'English'},
        { code: 'es',iso: 'n/a', name:'español,'},
        { code: 'fi',iso: 'n/a', name:'suomi,'},
        { code: 'fr',iso: 'n/a', name:'français'},
        { code: 'he',iso: 'n/a', name:'עברית'},
        { code: 'hi',iso: 'n/a', name:'हिन्दी'},
        { code: 'hu',iso: 'n/a', name:'magyar'},
        { code: 'hy',iso: 'n/a', name:'Հայերեն'},
        { code: 'id',iso: 'n/a', name:'Bahasa Indonesia'},
        { code: 'is',iso: 'n/a', name:'íslenska'},
        { code: 'it',iso: 'n/a', name:'Italiano'},
        { code: 'ja',iso: 'n/a', name:'日本語'},
        { code: 'kk',iso: 'n/a', name:'Қазақ тілі‎,'},
        { code: 'ku',iso: 'n/a', name:'Kurdî,'},
        { code: 'lt',iso: 'n/a', name:'lietuvių'},
        { code: 'lv',iso: 'n/a', name:'latviešu'},
        { code: 'nb',iso: 'n/a', name:'norsk bokmål'},
        { code: 'nl',iso: 'n/a', name:'Nederlands'},
        { code: 'nn',iso: 'n/a', name:'norsk nynorsk'},
        { code: 'pl',iso: 'n/a', name:'język polski,'},
        { code: 'pt',iso: 'n/a', name:'português'},
        { code: 'ro',iso: 'n/a', name:'limba română,'},
        { code: 'ru',iso: 'n/a', name:'русский язык'},
        { code: 'sr',iso: 'n/a', name:'српски језик,'},
        { code: 'sv',iso: 'n/a', name:'svenska'},
        { code: 'th',iso: 'n/a', name:'ภาษาไทย'},
        { code: 'tr',iso: 'n/a', name:'Türkçe'},
        { code: 'uk',iso: 'n/a', name:'українська мова'},
        { code: 'vi',iso: 'n/a', name:'Tiếng Việt'},
        { code: 'zh_CN',iso: 'n/a', name:'中文 簡体'},
        { code: 'zh_TW',iso: 'n/a', name:'中文 繁体'}        
      ],
      detectBrowserLanguage: false,
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en',
        silentFallbackWarn: true
      },
      vueI18nLoader: true
    }]
  ],

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [
	      new VuetifyLoaderPlugin(),
        new MonacoWebpackPlugin({
          languages: ['json','yaml']
        })

    ],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.node = {
        fs: "empty" //Avoiding fs dependancy errors.
      };
    }
  }
}
