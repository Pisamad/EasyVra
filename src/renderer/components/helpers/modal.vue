<template>
    <div ref="modal" :class="['ez-modal', 'modal',{'is-active':isOpen}]" v-if="isOpen">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="modal-card-title">
                    <slot name="header"></slot>
                </div>
                <button v-if="closable" @click="close" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <slot></slot>
            </section>
            <footer class="modal-card-foot">
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .ez-modal {
        .modal-background {
            background-color: rgba(0, 0, 0, 0.4);
        }
        footer > div {
            flex-grow: 1;
        }
    }
</style>

<script type="text/babel">
  export default {
    props: {
      onClose: {
        type: Function,
        default: () => {
        },
        required: false
      },
      closable: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        isOpen: false
      }
    },

    methods: {
      handleKeydown (event) {
        let vm = this
        if (event.key === 'Escape' || event.keyCode === 27) {
          vm.close()
          vm.$forceUpdate()
        }
      },

      open () {
        let vm = this
        vm.$notify.clean()
        vm.isOpen = true
        document.addEventListener('keydown', vm.handleKeydown)
      },

      close () {
        let vm = this
        document.removeEventListener('keydown', vm.handleKeydown)
        vm.isOpen = false
        vm.onClose()
      }
    }
  }
</script>
