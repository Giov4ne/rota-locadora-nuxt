// import Vue from 'vue'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'

// Vue.use(Vuetify)

// const opts = {}

// export default new Vuetify(opts)


import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
export default ({ app }, inject) => {
  app.vuetify = new Vuetify({})
}