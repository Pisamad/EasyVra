<template>
    <div id="layout">
        <div id="header" class="level is-marginless">

            <div class="level-item tabs is-boxed">
              <ul>
                <li :class="{'is-active':$route.name==='catalog'}">
                  <router-link to="/app/catalog">
                      <span class="icon is-small"><i class="fa fa-shopping-cart"></i></span>
                      <span>Catalog</span>
                  </router-link>
                </li>
                <li :class="{'is-active':$route.name==='subtenant'}">
                  <router-link to="/app/subtenant">
                      <span class="icon is-small"><i class="fa fa-bug"></i></span>
                      <span>Subtenant</span>
                  </router-link>
                </li>
                 <li :class="{'is-active':$route.name==='content'}">
                  <router-link to="/app/content">
                      <span class="icon is-small"><i class="fa fa-bug"></i></span>
                      <span>Content</span>
                  </router-link>
                </li>
                <li :class="{'is-active':$route.name==='debug'}">
                  <router-link to="/app/debug">
                      <span class="icon is-small"><i class="fa fa-bug"></i></span>
                      <span>Debug</span>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="level-right tabs is-boxed">
                <ul class="is-icon">
                    <li><a @click="$modal.open('Config')">
                        <span class="icon is-small"><i class="fa fa-gear"></i></span>
                        <span>Config</span>
                    </a></li>
                    <li><a @click="$modal.open('About')">
                        <span class="icon is-small"><i class="fa fa-info"></i></span>
                        <span>About</span>
                    </a></li>
                </ul>
            </div>
        </div>
        <notifications/>
        <h1 v-if="title" class="title">{{title}}</h1>
        <slot :winHeight="winHeight" :winWidth="winWidth"></slot>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: {
      running: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },

    data: () => ({
      date: '',
      winHeight: window.innerHeight - 42,
      winWidth: window.innerWidth,
      loadingInstance: null,
      modal: ''
    }),

    computed: {
      ...mapGetters(['documentTitle'])
    },

    async beforeMount () {
      let vm = this

      vm.$store.dispatch('configLoad')
      window.addEventListener('resize', this.handleWindowResize, {passive: true})

      try {
        await vm.$store.dispatch('configCheck')
      } catch (err) {
        vm.$modal.open('Config')
      }
      document.title = vm.documentTitle
    },

    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleWindowResize)
    },

    methods: {
      handleWindowResize (event) {
        this.winHeight = event.currentTarget.innerHeight - 42
        this.winWidth = event.currentTarget.innerWidth
      }
    }
  }
</script>

<style lang="scss">
    @import "~font-awesome/css/font-awesome.css";
    //  @import "~bulma/sass/utilities/initial-variables.sass";
    @import "~bulma";

    .input, .button, .textarea, .select select {
        height: 1.5em;
        padding-bottom: 0;
        padding-top: 0;
    }

    .select select {
        height: 1.5em !important;
        padding-bottom: 0px;
        padding-top: 0px;
    }

    .select:not(.is-multiple) {
        height: 1.5em;
    }

    .el-loading-mask {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .modal-content, .modal-card {
        // Allow modal width
        margin-left: 50px;
        margin-right: 50px;
        width: 2000px;
    }

    .button {
        padding-top: 0;
    }

    .button.is-transparent {
        background-color: transparent;
        border: 0px;
    }

    .section {
        padding: 1rem 1.5rem;
    }

    #header {
        background-color: honeydew;
    }

    html {
        overflow-x: hidden;
        overflow-y: hidden;
        background-color: white;
    }

    body {
        overflow-x: hidden;
        overflow-y: hidden;
    }

    thead {
        background-color: aliceblue;
    }

    table {
        width: -webkit-fill-available;
    }

    .tabs:not(:last-child) {
        margin-bottom: 0;
    }

    td {
        vertical-align: middle !important;
    }
</style>
