<template>
    <div>
        <router-view></router-view>
        <component :ref="modal" v-for="(modal, index) in modules" :is="modal" :key="index"></component>
    </div>
</template>

<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import modules from '@/components/Modal'

  export default {
    data: () => ({
      modules: _.keys(modules)
    }),

    components: modules,

    mounted () {
      let vm = this
      this.$store.dispatch('configLoad')
      Vue.prototype.$modal = {
        open: vm.openModal,
        close: vm.closeModal,
        isOpen: vm.isModalOpen
      }
    },

    methods: {
      openModal (mod, ...args) {
        let vm = this
        vm.$refs['modal' + mod][0].open(...args)
      },
      isModalOpen (mod) {
        let vm = this
        return vm.$refs['modal' + mod][0].isOpen
      },
      closeModal (mod) {
        let vm = this
        vm.$refs['modal' + mod][0].close()
      }
    }
  }
</script>

<style>
    /* CSS */
</style>
