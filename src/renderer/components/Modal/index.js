import _ from 'lodash'

const files = require.context('@/app', true, /modal\..*\.vue$/i)
const modules = {}

files.keys().forEach(key => {
  let component = files(key)
  let name = _.camelCase(key.replace(/\.vue/, ''))
  modules[name] = component.default
})

export default modules
