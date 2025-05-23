export default {
  ssr: false, // Set to true for SSR
  target: 'static', // or 'server'
  router: {
    middleware: [
      'authentication'
    ]
  },
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  buildModules: [
    '@nuxtjs/fontawesome',
  ],
  build: {
    extend (config, { isDev, isClient }) {
      if (isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/,
          use: {
            loader: 'worker-loader'
          },
          exclude: /(node_modules)/
        })
      }
    }
  },
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
        'faEyeSlash',
        'faPlus',
        'faPencil',
        'faTrash'
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
    },
    { 
      src: '@/plugins/moment', 
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
  devtools: true,
  axios: {
    baseURL: 'https://api-dev.rotaexata.com.br/',
    headers: {
      post: {
        'User-Agent': 'eurota'
      }
    }
  },
  auth: {
    cookie: {
      prefix: 'auth.'
    },
    // redirect: {
    //   login: '/auth/login',
    //   logout: false
    // },
    redirect: false,
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: 3600,
          global: true,
          type: ''
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 7776000
        },
        user: {
          property: 'session',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          refresh: { url: '/refresh-token', method: 'post' },
          user: { url: '/me', method: 'get' },
          logout: { url: '/logout', method: 'get' }
        }
      }
    },
  }
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
