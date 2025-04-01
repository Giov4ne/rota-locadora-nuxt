export default {
  ssr: false, // Set to true for SSR
  target: 'static', // or 'server'
  router: {
    middleware: ['authentication']
  },
  buildModules: [
    '@nuxtjs/fontawesome'
  ],
  fontawesome: {
    component: 'fa',
    icons: {
      solid: [
        'faMagnifyingGlass'
      ]
    }
  }
}
