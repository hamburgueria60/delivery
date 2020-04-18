<template>
  <span>
    <Button class="danger" v-bind="$attrs" outlined @click="onClick">
      Cancelar
    </Button>

    <discard-confirm :md-active.sync="open" :loading="loading" @confirm="onConfirm" @cancel="closeConfirm" />
  </span>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

import DiscardConfirm from '@/components/CreateOrder/DiscardConfirm.vue'
import Button from '@/components/ui/Button.vue'
import { DELETE_ORDER } from '@/gqls'
import Status from '@/types/Status'

export default {
  components: {
    DiscardConfirm,
    Button,
  },
  data() {
    return { open: false, loading: false }
  },
  computed: {
    ...mapState('CreateOrder', ['id', 'status', 'newOrder', 'dirty']),
    ...mapGetters('CreateOrder', ['isBlankOrder']),
  },
  methods: {
    ...mapMutations('CreateOrder', {
      discardLocalOrder: 'RESET',
    }),
    onClick() {
      if ((this.dirty && this.newOrder) || this.status === Status.Draft) {
        this.open = true
      } else {
        this.discardLocalOrder()
        this.$router.push({ name: 'orders' })
      }
    },
    async onConfirm() {
      await this.discardPersistedOrder()
      this.discardLocalOrder()
      this.$router.push({ name: 'orders' })
      this.closeConfirm()
    },
    closeConfirm() {
      this.open = false
    },
    async discardPersistedOrder() {
      if (this.status !== Status.Creating) {
        this.loading = true
        await this.$apollo.mutate({
          mutation: DELETE_ORDER,
          variables: { id: this.id },
        })
        this.loading = true
      }
    },
  },
}
</script>

<style></style>
