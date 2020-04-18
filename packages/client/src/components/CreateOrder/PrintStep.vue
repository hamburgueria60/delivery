<template>
  <div>
    <printable-order ref="body" v-bind="order" />

    <div class="tip w8 mt3 gray f6 lh-copy">
      <div v-if="!persisted && isAllStepsDone">
        Recomendamos que você revise as informações do pedido, pois após salvá-lo,
        <span class="b"> não será possível editá-lo</span>.
      </div>

      <div v-if="!isAllStepsDone">
        Algumas etapas não foram finalizadas:
        <span class="b"> {{ undoneStepsList }}. </span>
        Por favor, verifique-as e em seguida você poderá imprimir o pedido.
      </div>
    </div>

    <!-- Ações -->
    <div class="mt3 pt0 flex flex-shrink-0">
      <div v-if="persisted">
        <Button class="mr2" outlined @click="print">Imprimir</Button>
        <Button class="mr2" filled @click="toOrders">Ir para Pedidos</Button>
      </div>

      <v-fragment v-if="!persisted">
        <cancel-button class="mr2" />

        <Button class="ml-auto mr2" outlined @click="GO_STEP(2)">
          Voltar
        </Button>

        <LoadingButton :loading="persisting" :disabled="!isAllStepsDone" filled @click="handleSaveAndPrintBtnClick">
          Salvar e imprimir
        </LoadingButton>
      </v-fragment>
    </div>

    <error-snackbar :md-active.sync="error">
      Não foi possível processar a sua solicitação. Tente novamente.
    </error-snackbar>
  </div>
</template>

<script>
import Vue from 'vue'
import MdSnackbar from 'vue-material/dist/components/MdSnackbar'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

import CancelButton from '@/components/CreateOrder/CancelButton.vue'
import ErrorSnackbar from '@/components/CreateOrder/ErrorSnackbar.vue'
import PrintableOrder from '@/components/CreateOrder/PrintableOrder.vue'
import Button from '@/components/ui/Button.vue'
import LoadingButton from '@/components/ui/LoadingButton.vue'
import VFragment from '@/components/ui/VFragment'
import Status from '@/types/Status'
import print from '@/utils/print'

Vue.use(MdSnackbar)

export default {
  components: {
    ErrorSnackbar,
    CancelButton,
    PrintableOrder,
    LoadingButton,
    Button,
    VFragment,
  },
  data() {
    return { shortid: null, createdAt: null, persisting: false, error: null }
  },
  computed: {
    ...mapGetters('CreateOrder', [
      'isAllStepsDone',
      'undoneSteps',
      'groupedSelectedItems',
      'change',
      'isPrintStepDone',
      'subtotalAmount',
      'totalAmount',
      'totalAdditionOrDiscount',
    ]),
    ...mapState('CreateOrder', ['address', 'deliveryFee', 'payment', 'note', 'persisted', 'type', 'table']),
    ...mapState('User', { user: 'current' }),
    undoneStepsList() {
      const undoneSteps = [...this.undoneSteps]
      return [undoneSteps.slice(0, -1).join(', '), undoneSteps.pop()].filter(Boolean).join(' e ')
    },
    order() {
      return {
        attendant: this.user,
        items: this.groupedSelectedItems,
        totalAmount: this.totalAmount,
        deliveryFee: this.deliveryFee,
        additionOrDiscount: this.totalAdditionOrDiscount,
        payment: this.payment,
        address: this.address,
        type: this.type,
        table: this.table,
        shortid: this.shortid,
        createdAt: this.createdAt,
        note: this.note,
      }
    },
  },
  methods: {
    ...mapMutations('CreateOrder', ['GO_STEP']),
    ...mapActions('CreateOrder', ['persist', 'updateLocationDeliveryFee']),
    toOrders() {
      this.$router.push({ name: 'orders' })
    },
    async print() {
      await this.$nextTick()
      await print(this.$refs.body.$el)
    },
    async handleSaveAndPrintBtnClick() {
      if (!this.persisted) {
        try {
          this.error = false
          this.persisting = true

          const order = await this.persist(Status.Received)
          await this.updateLocationDeliveryFee()

          this.shortid = order.shortid
          this.createdAt = order.createdAt

          this.print()
        } catch (error) {
          this.error = true
        } finally {
          this.persisting = false
        }
      }
    },
  },
}
</script>
