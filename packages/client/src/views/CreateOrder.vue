<template>
  <div class="mw8 center ph3">
    <steps
      menu-class="dn db-l"
      :bold="boldSteps"
      :current="currentStep"
      :done="doneSteps"
      :blocked="blockedSteps"
      :labels="labels"
      @change="GO_STEP"
    >
      <component :is="component" v-for="({ component, label }, index) in currentSteps" :key="label" :step="index" />

      <template #bottom>
        <order-summary />
      </template>
    </steps>

    <draft-confirm :md-active.sync="isDraftConfirmOpen" @cancel="hideDraftConfirm" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

import DraftConfirm from '@/components/CreateOrder/DraftConfirm.vue'
import ItemsStep from '@/components/CreateOrder/ItemsStep.vue'
import LocationStep from '@/components/CreateOrder/LocationStep.vue'
import OrderSummary from '@/components/CreateOrder/OrderSummary.vue'
import PaymentStep from '@/components/CreateOrder/PaymentStep.vue'
import PrintStep from '@/components/CreateOrder/PrintStep.vue'
import Steps from '@/components/ui/Steps.vue'
import EventBus from '@/events/DraftConfirmEventBus'
import { mapGetterSetter } from '@/utils/mapGetterSetter'

export default {
  name: 'CreateOrder',
  components: {
    Steps,
    DraftConfirm,
    OrderSummary,
    PrintStep,
    PaymentStep,
    LocationStep,
    ItemsStep,
  },
  data() {
    return {
      steps: [
        {
          component: 'items-step',
          label: 'Itens',
        },
        {
          component: 'location-step',
          label: 'Localização',
        },
        {
          component: 'payment-step',
          label: 'Pagamento',
        },
        {
          component: 'print-step',
          label: 'Impressão',
        },
      ],
    }
  },
  computed: {
    ...mapState('CreateOrder', ['currentStep', 'boldSteps', 'dirty']),
    ...mapGetters('CreateOrder', ['doneSteps', 'blockedSteps', 'isBlankOrder']),
    ...mapGetterSetter('CreateOrder', {
      isDraftConfirmOpen: 'SET_IS_DRAFT_CONFIRM_OPEN',
    }),
    currentSteps() {
      return this.steps.filter((_, index) => this.currentStep === index)
    },
    labels() {
      return this.steps.map(step => step.label)
    },
  },
  mounted() {
    if (this.isBlankOrder) {
      this.$router.replace({ name: 'orders' })
      return
    }

    this.unlistenBeforeEach = this.$router.beforeEach(async (to, from, next) => {
      if (this.dirty) {
        this.isDraftConfirmOpen = true
        const confirm = await EventBus.onceCofirmOrCancel()
        this.isDraftConfirmOpen = false
        if (confirm) next()
      } else {
        next()
      }
    })
  },
  beforeDestroy() {
    this.unlistenBeforeEach?.()
    this.RESET()
  },
  methods: {
    ...mapMutations('CreateOrder', ['GO_STEP', 'RESET']),
    hideDraftConfirm() {
      this.isDraftConfirmOpen = false
    },
  },
}
</script>
