import fs from 'fs'
import os from 'os'
import path from 'path'
import mkdirp from 'mkdirp'
import manifest from 'src/../manifest'
import _ from 'lodash'
import Q from 'bluebird'
import { Vra } from 'app/vra'

const cfgFile = path.join(os.homedir(), '.easyvra', 'config.json')

const state = {}

let password

const mutations = {
  RESET_CONFIG (state) {
    _.map(state, e => {
      delete state[e]
    })
    _.assign(state, {
      appli: {
        name: manifest.name,
        version: manifest.version,
        support: process.env.USERDOMAIN
          ? manifest.support[process.env.USERDOMAIN]
          : {mail: manifest.author},
        author: manifest.author,
        copyright: manifest.copyright,
        build: manifest.build,
        mode: manifest.mode
      },
      vraUrl: '',
      rootClient: os.homedir(),
      user: '',
      history: [],
      tenants: ['vdi', 'common']
    })
  },

  UPDATE_CONFIG (state, config = {}) {
    Object.assign(state, config)
  },

  LOAD_CONFIG (state) {
    let cfgFromFile = {}

    // Read config from file
    try {
      cfgFromFile = JSON.parse(fs.readFileSync(cfgFile))
    } catch (err) {
      // No config file found
    }

    // Merge config from file and p4 config
    delete cfgFromFile.appli
    _.merge(state, cfgFromFile)
  },

  SAVE_CONFIG (state) {
    try {
      mkdirp.sync(path.dirname(cfgFile))
    } catch (err) {
      // Don't care if dir already exist
      if (err.code !== 'EEXIST') {
        throw err
      }
    }
    try {
      fs.writeFileSync(cfgFile, JSON.stringify(state, null, 4))
    } catch (err) {
      // Not able to write config file
      throw err
    }
  }
}

const getters = {
  documentTitle: (state) =>
    (state.appli
      ? (state.appli.name + ' - V' + state.appli.version +
        ((state.appli.mode === 'development') ? (' (build ' + state.appli.build + ') ') : ''))
      : ''),

  p4Config: (state) => (key) => state.p4[key]

}

const actions = {
  configLoad ({commit}) {
    commit('RESET_CONFIG')
    commit('LOAD_CONFIG')
  },

  configReset ({commit}) {
    commit('RESET_CONFIG')
    commit('SAVE_CONFIG')
    commit('LOAD_CONFIG')
  },

  configSave ({commit}, config) {
    commit('SAVE_CONFIG', config)
  },

  async configCheck ({state, dispatch}, passwd) {
    // Check p4 config
    let errConfig = []
    password = (passwd !== undefined) ? passwd : password
    if (password === undefined) {
      errConfig.push(new Error('Password is not defined'))
    } else {
      try {
        // Vra.tenants = {}
        await Q.map(state.tenants, tenant => Vra.init(tenant, state.user, password))
      } catch (err) {
        errConfig.push(err)
      }
    }
    // Check if rootClient can be used
    // - Check if rootClient exists
    let rootSpec = path.parse(state.rootClient)
    rootSpec.dir = rootSpec.dir.slice(rootSpec.root.length)
    rootSpec.tempPath = rootSpec.root
    rootSpec.dir.split(path.sep).forEach(dir => {
      rootSpec.tempPath = path.join(rootSpec.tempPath, dir)
      try {
        mkdirp.sync(rootSpec.tempPath)
      } catch (err) {
        // console.warn(err.message)
      }
    })
    // - Check if rootClient is writable
    try {
      mkdirp.sync(state.rootClient + '/EzP43529')
      fs.rmdirSync(state.rootClient + '/EzP43529')
    } catch (err) {
      errConfig.push(new Error('Unable to create RootClient "' + state.rootClient + '"'))
    }

    if (errConfig.length !== 0) {
      throw new Error(_.filter(errConfig, 'message').join(' ; '))
    }
  }
}

mutations.RESET_CONFIG(state)
export default {
  state,
  getters,
  mutations,
  actions
}
