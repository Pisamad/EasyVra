<template>
  <modal ref="modalTemplate" :onClose="onClose">
    <div>
    </div>
    <div slot="header">Template</div>
    <div slot="footer">
        <button class="button is-success" @click="commit">Save</button>
    </div>
  </modal>
</template>

<style lang="scss" scoped>
</style>

<script type="text/babel">
  import modal from '@/components/helpers/modal.vue'

  export default {
    props: ['onClose'],

    data: () => ({
    }),

    components: {
      modal
    },

    methods: {
      commit () {
        let vm = this
        vm.$refs['modalTemplate'].close()
      },

      open () {
        let vm = this
        vm.$refs['modalConfig'].open()
      },

      closeConfig () {
      }
    }
  }
</script>
