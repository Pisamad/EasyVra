<template>
    <layout>
        <div slot-scope="props">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column">
                        <section>
                          <ez-table class="table is-bordered is-striped is-narrow" bottomMarge=40>
                            <thead slot="thead">
                              <th class="Tenant">Tenant</th>
                              <!--th class="Subenant">Subtenant</th-->
                              <th class="Name">Name</th>
                              <th class="Type">Type</th>
                              <th class="Description">Description</th>
                            </thead>
                            <tbody slot="tbody">
                              <tr v-for="(content, index) in contents" :key="index">
                                <td class="Tenant">{{content.tenantId}}</td>
                                <!--td class="Subtenant">{{content.subtenantId}}</td-->
                                <td>
                                  <div :class="['is-flex']" 
                                    @click.stop="select(content)">
                                        {{content.name}}
                                  </div>
                                </td>
                                <td>{{content.contentTypeId}}</td>
                                <td>{{content.description}}</td>
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
import { VraContents } from 'app/vraContents'
import Q from 'bluebird'
import _ from 'lodash'

export default {
  components: {
    layout
  },

  data: () => ({
    contents: {},
    selected: ''
  }),

  beforeUpdate () {
    let vm = this
    vm.refresh()
  },

  methods: {
    async refresh () {
      let vm = this
      let contents = await Q.map(
        _.keys(Vra.tenants),
        async t => (await VraContents(t)).list
      )
      vm.contents = _.chain(Object.assign({}, ...contents))
        .values()
        .map(item => {
          item.selected = false
          return item
        })
        .sortBy(['tenantId', 'contentTypeId'])
        .value()
    },

    shortName (bgName, tenantName) {
      return bgName.slice(tenantName.length + 12)
    },

    async select (content) {
      let vm = this
      vm.selected = ''
      vm.$modal.open('Content', content)
    }
  }
}
</script>
