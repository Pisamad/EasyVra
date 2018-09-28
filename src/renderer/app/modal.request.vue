<template>
    <modal ref="modalRequest" :onClose="onClose">
        <div>
          <pre>
            {{JSON.stringify(entitledCatalogItem, null, 4)}}
          </pre>
        </div>
        <div slot="header">Request</div>
        <div slot="footer">
            <button class="button is-success" @click="commit">Save</button>
        </div>
    </modal>
</template>

<style lang="scss" scoped>
</style>

<script type="text/babel">
  import _ from 'lodash'
  import modal from '@/components/helpers/modal.vue'
  import {Vra} from 'app/vra'

  export default {
    props: ['onClose'],

    data: () => ({
      entitledCatalogItem: {}
    }),

    components: {
      modal: modal
    },

    methods: {
      commit () {
        let vm = this

        vm.$refs['modalRequest'].close()
      },

      open (entitledCatalogItem, subtenantRef) {
        let vm = this
        console.log(Vra.tenants)
        console.log(entitledCatalogItem.tenantRef)
        vm.entitledCatalogItem = Object.assign({}, entitledCatalogItem, {entitled: _.filter(entitledCatalogItem.entitled, {subtenantRef})})
        vm.$refs['modalRequest'].open()
      },

      closeConfig () {
      }
    }
  }
</script>
