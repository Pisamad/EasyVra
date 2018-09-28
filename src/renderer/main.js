import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store_ from './store'
// !!import {remote} from 'electron'

// ------------------------
import {Dropdown, DropdownItem, DropdownMenu, Loading, Tree} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import Notifications from 'vue-notification'
import {Drag, Drop} from 'vue-drag-drop'
import ezTable from 'ez-table'
// import ezTable from 'src/../../../../Projects/ez-table/dist/ez-table.js'
// import ezTable from 'src/../../../../Projects/ez-table/src/ez-table.vue'
// Vue.component('ez-table', ezTable)

locale.use(lang)

Vue.use(Tree)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Loading)
Vue.use(Notifications)
Vue.use(ezTable)

Vue.prototype.$notify.success = (text) => Vue.prototype.$notify({type: 'success', duration: -1, text: text})
Vue.prototype.$notify.error = (text) => Vue.prototype.$notify({type: 'error', duration: -1, text: text})
Vue.prototype.$notify.info = (text) => Vue.prototype.$notify({type: 'warn', duration: 5000, text: text})
Vue.prototype.$notify.clean = () => Vue.prototype.$notify({clean: 'true'})

Vue.component('drag', Drag)
Vue.component('drop', Drop)

// ------------------------

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// !!global.__args = remote.getGlobal('__args') || {}
global.store = store_

/* eslint-disable no-new */
global.__VUE_INSTANCE = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
