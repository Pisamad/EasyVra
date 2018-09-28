<template>
    <modal ref="modalContent" :onClose="onClose">
        <div>
          <pre v-if="true">
            {{JSON.stringify(Object.assign({}, content, {properties:null}), null, 4)}}
          </pre>
          
          <ez-table v-if="false" class="table is-bordered is-striped is-narrow" bottomMarge=40>
            <thead slot="thead">
              <th>Key</th>
              <th>Value</th>
              <th>$</th>
              <th>#</th>
            </thead>
            <tbody slot="tbody">
              <tr v-for="(property, index) in content.properties" :key="index">
                <td>{{property.key}}</td>
                <td>{{property.value}}</td>
                <td>{{property.encrypted}}</td>
                <td>{{property['prompt-user']}}</td>
              </tr>
            </tbody>
          </ez-table>

        </div>
        <div slot="header">
          <p>{{content.tenant}}/{{content.name}}</p>
          <i>{{content.description}}</i>
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
      content: {}
    }),

    components: {
      modal: modal
    },

    methods: {
      commit () {
        let vm = this

        vm.$refs['modalContent'].close()
      },

      open (content) {
        let vm = this
        vm.content = Object.assign({}, content)
        vm.$refs['modalContent'].open()
      },

      closeConfig () {
      }
    }
  }
</script>
