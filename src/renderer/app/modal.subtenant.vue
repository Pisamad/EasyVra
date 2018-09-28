<template>
    <modal ref="modalSubtenant" :onClose="onClose">
        <div>
          <pre v-if="false">
            {{JSON.stringify(Object.assign({}, subtenant, {properties:null}), null, 4)}}
          </pre>
          
          <ez-table class="table is-bordered is-striped is-narrow" bottomMarge=40>
            <thead slot="thead">
              <th>Key</th>
              <th>Value</th>
              <th>$</th>
              <th>#</th>
            </thead>
            <tbody slot="tbody">
              <tr v-for="(property, index) in subtenant.properties" :key="index">
                <td>{{property.key}}</td>
                <td>{{property.value}}</td>
                <td>{{property.encrypted}}</td>
                <td>{{property['prompt-user']}}</td>
              </tr>
            </tbody>
          </ez-table>

        </div>
        <div slot="header">
          <p>{{subtenant.tenant}}/{{subtenant.name}}</p>
          <i>{{subtenant.description}}</i>
        </div>
        <div slot="footer">
            <button class="button is-success" @click="commit">Save</button>
        </div>
    </modal>
</template>

<style lang="scss" scoped>
</style>

<script type="text/babel">
  // import _ from 'lodash'
  import modal from '@/components/helpers/modal.vue'
  // import {Vra} from 'app/vra'

  export default {
    props: ['onClose'],

    data: () => ({
      subtenant: {}
    }),

    components: {
      modal: modal
    },

    methods: {
      commit () {
        let vm = this

        vm.$refs['modalSubtenant'].close()
      },

      open (subtenant) {
        let vm = this
        vm.subtenant = Object.assign({}, subtenant)
        vm.$refs['modalSubtenant'].open()
      },

      closeConfig () {
      }
    }
  }
</script>
