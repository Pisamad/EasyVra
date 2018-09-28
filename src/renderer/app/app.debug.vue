<template>
    <layout>
        <div slot-scope="props">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column">
                        <section class="section">
                          <ez-table class="table is-bordered is-striped is-narrow" bottomMarge=40>
                            <thead slot="thead">
                              <th class="field has-addons">
                                  <div class="control">
                                      <select v-model="tenant">
                                        <option v-for="(t, i) in tenants" :key="i" :value="t">{{t}}</option>
                                      </select>
                                  </div>
                                  <div class="control  is-expanded">
                                      <input @keyup.enter="refresh" :class="['input', 'is-expanded']" v-model="request" />
                                  </div>
                              </th>
                            </thead>
                            <tbody slot="tbody">
                              <tr><td>
                                <pre>
                                  {{res}}
                                </pre>
                              </td></tr>
                            </tbody>
                          </ez-table>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<style lang="scss" scoped>

</style>

<script type="text/babel">
  import layout from '@/components/Layout.vue'
  import {Vra} from 'app/vra'
  import _ from 'lodash'

  export default {
    components: {
      layout
    },

    data: () => ({
      res: {},
      tenant: '',
      tenants: [],
      request: ''
    }),

    beforeUpdate () {
      let vm = this
      vm.tenants = _.keys(Vra.tenants)
    },

    methods: {
      async refresh () {
        let vm = this
        try {
          vm.res = await Vra.get(vm.tenant, vm.request)
        } catch (err) {
          vm.res = err
        }
      }
    }
  }
</script>
