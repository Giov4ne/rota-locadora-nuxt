export default {
  ssr: false, // Set to true for SSR
  target: 'static', // or 'server'
  router: {
    middleware: [
      'authentication'
    ]
  },
  buildModules: [
    '@nuxtjs/fontawesome',
    '@nuxtjs/vuetify'
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
    }
  ]
}
