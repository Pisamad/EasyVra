import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

let apps = {}
const files = require.context('@/app', true, /app\..*\.vue$/i)
files.keys().forEach(key => {
  let component = files(key)
  let name = _.camelCase(key.replace(/app\.(.*)\.vue/, '$1'))
  apps[name] = component.default
})

Vue.use(Router)

const routes = {
  routes: [
    ...(_.map(apps, (v, k) => ({
      path: '/app/' + k,
      name: k,
      component: v
    }))),
    {
      path: '*',
      redirect: '/app/main'
    }
  ]
}

export default new Router(routes)
