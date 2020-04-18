<template>
  <dialog-confirm
    header="Descartar pedido?"
    confirm-text="Sim, descartar pedido"
    confirm-class="danger"
    cancel-text="Não, quero continuar nesse pedido"
    v-bind="$attrs"
    v-on="$listeners"
  >
    Todas as informações contidas nesse pedido serão perdidas, mesmo se o pedido já for um rascunho.
  </dialog-confirm>
</template>

<script>
import DialogConfirm from '@/components/ui/DialogConfirm.vue'

export default {
  components: {
    DialogConfirm,
  },
}
</script>

<style scoped></style>
