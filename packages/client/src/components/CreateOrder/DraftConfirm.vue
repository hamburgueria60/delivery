<template>
  <div>
    <dialog-confirm
      header="Salvar pedido atual como rascunho?"
      confirm-text="Sim, salvar rascunho"
      cancel-text="Não, quero continuar nesse pedido"
      v-bind="$attrs"
      :loading="persisting"
      :md-click-outside-to-close="!persisting"
      :md-close-on-esc="!persisting"
      v-on="$listeners"
      @confirm="onConfirm"
      @cancel="onCancel"
      @md-closed="onCancel"
    >
      O pedido aberto ainda não foi finalizado. Você pode salvar o pedido como rascunho e finalizá-lo posteriormente.
    </dialog-confirm>

    <error-snackbar :md-active.sync="error">
      Não foi possível processar a sua solicitação. Tente novamente.
    </error-snackbar>
  </div>
</template>

<script>
import ErrorSnackbar from '@/components/CreateOrder/ErrorSnackbar.vue'
import DialogConfirm from '@/components/ui/DialogConfirm.vue'
import DraftConfirmEventBus, { CANCEL, CONFIRM } from '@/events/DraftConfirmEventBus'
import Status from '@/types/Status'

export default {
  components: {
    ErrorSnackbar,
    DialogConfirm,
  },
  data() {
    return {
      persisting: false,
      error: false,
    }
  },
  methods: {
    onCancel() {
      DraftConfirmEventBus.$emit(CANCEL)
    },
    async onConfirm() {
      try {
        this.error = false
        this.persisting = true
        await this.$storeTyped.dispatch('CreateOrder/persist', Status.Draft)
        DraftConfirmEventBus.$emit(CONFIRM)
      } catch (e) {
        this.error = true
        throw e
      } finally {
        this.persisting = false
      }
    },
  },
}
</script>

<style scoped></style>
