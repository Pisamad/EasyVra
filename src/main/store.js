import modules from 'src/stores'
import _ from 'lodash'

export const store = {
  state: {},
  dispatch: {},
  commit: {},
  getters: {}
}

const actions = {}
const commits = {}
const getters = {}

_.forEach(modules, (value, key) => {
  store.state[key] = value.state
  _.assign(store.dispatch, value.actions)
  _.assign(store.commit, value.mutations)
  _.assign(store.getters, value.getters)

  _.forEach(value.actions, (f, action) => {
    actions[action] = {module: key, function: f}
  })
  _.forEach(value.mutations, (f, action) => {
    commits[action] = {module: key, function: f}
  })
  _.forEach(value.getters, (f, action) => {
    getters[action] = {module: key, function: f}
  })
})

store.dispatch = async (action, ...args) => {
  let act = actions[action]
  return act.function({
    state: store.state[act.module],
    commit: store.commit,
    dispatch: store.dispatch,
    getters: store.getters
  }, ...args)
}

store.commit = (mutation, ...args) => {
  let act = commits[mutation]
  return act.function(store.state[act.module], ...args)
}

store.getters = (getter) => {
  let act = commits[getter]
  return act.function({state: store.state[act.module]})
}
