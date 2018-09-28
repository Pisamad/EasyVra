import Vue from 'vue'
import Vuex from 'vuex'

import modules from 'src/stores'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
