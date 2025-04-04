export default {
  ssr: false, // Set to true for SSR
  target: 'static', // or 'server'
  // vuetify: {

  // },
  router: {
    middleware: [
      'authentication'
    ]
  },
  modules: [
    '@nuxtjs/vuetify'
  ],
  buildModules: [
    '@nuxtjs/fontawesome',
  ],
  fontawesome: {
    component: 'fa',
    icons: {
      solid: [
        'faMagnifyingGlass',
        'faEraser',
        'faFilter',
        'faCar',
        'faRightFromBracket',
        'faStar',
        'faLocationDot',
        'faEye',
        'faEyeSlash'
      ]
    }
  },
  plugins: [
    { 
      src: '@/plugins/fontawesome', 
      ssr: false 
    },
    { 
      src: '@/plugins/vuetify', 
      ssr: false 
    }
  ],
  loaders: {
    scss: {
      implementation: require('sass')
    }
  },
  vue: {
    config: {
      devtools: true
    }
  },
  devtools: true
  // rules: [
  //   {
  //     test: /\.s(c|a)ss$/,
  //     use: [
  //       'css-loader',
  //       {
  //         loader: 'sass-loader',
  //         // Requires >= sass-loader@^8.0.0
  //         options: {
  //           implementation: require('sass'),
  //           sassOptions: {
  //             indentedSyntax: true // optional
  //           },
  //         },
  //       },
  //     ],
  //   }
  // ]
}
