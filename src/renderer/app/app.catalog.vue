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
                              <tr v-for="(entitledCatalogItem, index) in entitledCatalogItems" :key="index">
                                <td class="Tenant">{{entitledCatalogItem.tenantLabel}}</td>
                                <td>
                                  <div :class="['dropdown', 'is-flex', {'is-active':entitledCatalogItem.item.name===selected}]" 
                                    @click.stop="select(entitledCatalogItem)">
                                    <div class="dropdown-trigger">
                                      <span aria-haspopup="true" aria-controls="dropdown-menu">
                                        {{entitledCatalogItem.item.name}}
                                      </span>
                                    </div>
                                    <div class="dropdown-menu" id="dropdown-menu" role="menu" v-if="entitledCatalogItem.entitled.length>1">
                                      <div class="dropdown-content">
                                        <a href="#" class="dropdown-item" 
                                          @click="$modal.open('Request', entitledCatalogItem, entitled.subtenantRef)"
                                          v-for="(entitled, index2) in entitledCatalogItem.entitled" :key="index2">
                                          {{shortName(entitled.subtenantLabel, entitled.tenantLabel)}}
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>{{entitledCatalogItem.item.description}}</td>
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
import { VraCatalogItems } from 'app/vraCatalogItems'
import Q from 'bluebird'
import _ from 'lodash'

export default {
  components: {
    layout
  },

  data: () => ({
    entitledCatalogItems: {},
    selected: ''
  }),

  beforeUpdate () {
    let vm = this
    vm.refresh()
  },

  methods: {
    async refresh () {
      let vm = this
      let catalogItemByTenants = await Q.map(
        _.keys(Vra.tenants),
        async t => (await VraCatalogItems(t)).list
      )
      let catalogItems = Object.assign({}, ...catalogItemByTenants)
      vm.entitledCatalogItems = _.chain(catalogItems)
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

    select (entitledCatalogItem) {
      let vm = this
      if (entitledCatalogItem === undefined) {
        vm.selected = ''
      } else if (entitledCatalogItem.entitled.length === 1) {
        vm.$modal.open('Request', entitledCatalogItem, entitledCatalogItem.entitled[0].subtenantRef)
      } else {
        vm.selected = (vm.selected === entitledCatalogItem.item.name) ? '' : entitledCatalogItem.item.name
      }
    }
  }
}
</script>
