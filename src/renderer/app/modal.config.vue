<template>
    <modal ref="modalConfig" :onClose="onClose">
        <div class="tabs is-boxed">
            <ul>
                <li :class="{'is-active':tab==='Config'}">
                    <el-dropdown @command="selectConfig">
                        <a @click="tab='Config'">Config</a>
                        <el-dropdown-menu slot="dropdown">
                            <ez-dropdown-item v-for="conf in $store.state.Config.history" :config="conf" :key="conf"/>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                <li :class="{'is-active':tab==='File cmp tools'}" v-if="false">
                    <a @click="tab='File cmp tools'">File cmp tools</a>
                </li>
            </ul>
        </div>
        <div class="config-content" @keypress.enter="commit">
            <div v-show="tab==='Config'">
                <ul>
                    <li>
                        <label class="label">VRA url</label>
                        <input class="input" v-model="config.vraUrl"/>
                    </li>
                     <li>
                        <label class="label">User</label>
                        <input class="input" v-model="config.user"/>
                    </li>
                    <li>
                        <label class="label">Password</label>
                        <input class="input" type="password" v-model="password"/>
                    </li>
                    <li>
                        <label class="label">Root</label>
                        <input class="input" v-model="config.rootClient"/>
                    </li>  
                    <li>
                        <label class="label">Tenants</label>
                        <input class="input" v-model="tenantsList"/>
                    </li>
                </ul>
            </div>
        </div>
        <div slot="header">Configuration</div>
        <div slot="footer">
            <button class="button is-success" @click="commit">Save</button>
            <button class="button is-warning" @click="reset">Reset</button>
            <span class="help is-danger" v-show="!isValid">{{msg}}</span>
        </div>
    </modal>
</template>

<style lang="scss" scoped>
    .config-content {
        min-height: 200px
    }
</style>

<script type="text/babel">
  import modal from '@/components/helpers/modal.vue'

  const ezDropdownItem = {
    props: ['config'],
    template: '<el-dropdown-item :command="config">{{config}}</el-dropdown-item>'
  }

  export default {
    props: ['onClose'],

    data: () => ({
      tab: 'Config',
      isValid: true,
      msg: '',
      config: {
        history: [],
        tenants: []
      },
      user: '',
      password: undefined,
      tenantsList: ''
    }),

    components: {
      modal: modal,
      ezDropdownItem
    },

    methods: {
      /**
       * Load config from the storage
       */
      load () {
        let vm = this
        Object.assign(vm.config, store.state.Config)
        vm.tenantsList = vm.config.tenants.join(',')
      },

      /**
       * Submit config and check it.
       * If successful check, save the config and close the modal
       */
      async commit () {
        let vm = this

        vm.config.tenants = vm.tenantsList.split(',')
        vm.$store.commit('UPDATE_CONFIG', vm.config)

        try {
          await vm.$store.dispatch('configCheck', vm.password)
          let configItem = [vm.$store.state.Config.user, vm.$store.state.Config.password, vm.$store.state.Config.rootClient].join(';')
          if (vm.$store.state.Config.history.indexOf(configItem) === -1) {
            vm.config.history.push(configItem)
            vm.$store.commit('UPDATE_CONFIG', vm.config)
          }

          vm.$store.dispatch('configSave')
          vm.$refs['modalConfig'].close()
          vm.$parent.$children.map(c => (c.refresh && c.refresh()))
        } catch (err) {
          vm.isValid = false
          vm.msg = err.message
        }
      },

      /**
       * Reset the config
       */
      reset () {
        let vm = this
        vm.$store.dispatch('configReset')
      },

      open () {
        let vm = this
        vm.msg = ''
        vm.load()
        vm.$refs['modalConfig'].open()
      },

      closeConfig () {
      },

      /**
       * Select a config in the history
       * @param config : "port;user;path"
       */
      selectConfig (config) {
        let vm = this
        let cfg = {p4: {}};
        [cfg.user, cfg.password, cfg.rootClient] = config.split(';')
        vm.$store.commit('UPDATE_CONFIG', cfg)
      }

    }
  }
</script>
