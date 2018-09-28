<template>
    <layout>
        <div slot-scope="props" @click="select()">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column">
                        <section>
                          <ez-table class="table is-bordered is-striped is-narrow" bottomMarge=40>
                            <thead slot="thead">
                              <th class="Tenant">Tenant</th>
                              <th class="Item">Item</th>
                              <th class="Description">Description</th>
                            </thead>
                            <tbody slot="tbody">
                              <tr v-for="(subtenant, index) in subtenants" :key="index">
                                <td class="Tenant">{{subtenant.tenant}}</td>
                                <td>
                                  <div :class="['is-flex']" 
                                    @click.stop="select(subtenant)">
                                        {{subtenant.name}}
                                  </div>
                                </td>
                                <td>{{subtenant.description}}</td>
                              </tr>
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
  .dropdown {
    cursor: context-menu;
  }
</style>

<script type="text/babel">
import layout from '@/components/Layout.vue'
import { Vra } from 'app/vra'
import { VraSubtenants } from 'app/vraSubtenants'
import Q from 'bluebird'
import _ from 'lodash'

export default {
  components: {
    layout
  },

  data: () => ({
    subtenants: {},
    selected: ''
  }),

  beforeUpdate () {
    let vm = this
    vm.refresh()
  },

  methods: {
    async refresh () {
      let vm = this
      let subTenants = await Q.map(
        _.keys(Vra.tenants),
        async t => (await VraSubtenants(t)).list
      )
      vm.subtenants = _.chain(Object.assign({}, ...subTenants))
        .values()
        .map(item => {
          item.selected = false
          return item
        })
        .sortBy(['tenantLabel', 'item.name'])
        .value()
    },

    shortName (bgName, tenantName) {
      return bgName.slice(tenantName.length + 12)
    },

    select (subtenant) {
      let vm = this
      vm.selected = ''
      vm.$modal.open('Subtenant', subtenant)
    }
  }
}
</script>
