<template>
    <modal ref="modalAbout">

        <div>
            <div>
                <p>EasyP4 is a help interface for the version & configuration management of P4CM like projects.</p>
                <p>EasyP4 is fully P4CM compatible.</p>
                <p></p>
                <p></p>
            </div>
            <a v-if="support!==undefined" class="button" :href="mailSupport">
                <span class="icon is-small"><i class="fa fa-envelope-open-o"></i></span>
                <span>Send a feedback</span>
            </a>
        </div>

        <div slot="header" class="level">
            <div class="level-left media-left">
                <figure class="image is-64x64">
                    <img src="~@/assets/easyvra.png" alt="">
                </figure>
            </div>
            <div class="level-item">
                <h1>{{title}}</h1>
            </div>
        </div>
        <div slot="footer">
            <span class="icon is-small"><i class="fa fa-copyright"></i></span>
            <span>{{$store.state.Config.appli.copyright}}</span>
        </div>
    </modal>
</template>

<style lang="scss" scoped>
</style>

<script type="text/babel">
  import modal from '@/components/helpers/modal.vue'
  // import {Help} from 'doc/help'

  export default {
    data: () => ({
      support: undefined,
      mailSupport: '',
      title: ''
    }),

    components: {
      modal: modal
    },

    created () {
      let vm = this
      vm.load()
    },

    methods: {
      help () {
        // Help.open()
      },

      load () {
        let vm = this
        vm.support = vm.$store.state.Config.appli.support
        vm.title = vm.$store.state.Config.appli.name + ' - V' + vm.$store.state.Config.appli.version + ' (build ' + vm.$store.state.Config.appli.build + ') '
        vm.mailSupport = 'mailto://' + vm.support.mail + '?subject=[EASYP4]- ' + vm.title + ' - '
      },

      open () {
        let vm = this
        vm.load()
        vm.$refs['modalAbout'].open()
      },

      close () {
        let vm = this
        vm.$refs['modalAbout'].close()
      }
    }
  }
</script>
