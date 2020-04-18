<template>
  <div class="flex-1">
    <!-- Tipo de pagamento -->
    <div class="flex flex-column ph1 mb2">
      <div class="dib ttu tracked f7 gray">Tipo de pagamento</div>
      <div>
        <md-radio
          v-model="paymentService"
          v-tooltip="'Pagamento anterior ao consumo do pedido'"
          name="paymentService"
          value="prepaid"
        >
          Pré-pago
        </md-radio>

        <md-radio
          v-if="type === 'restaurant'"
          v-model="paymentService"
          v-tooltip="'Pagamento após o consumo o pedido'"
          name="paymentService"
          value="postpaid"
        >
          Pós-pago
        </md-radio>
      </div>
    </div>

    <!-- Forma de pagamento -->
    <div v-if="paymentService === 'prepaid'" class="flex flex-column ph1">
      <div class="dib ttu tracked f7 gray">Forma de pagamento</div>
      <div>
        <md-radio v-model="paymentType" value="money">
          Dinheiro
        </md-radio>

        <md-radio v-model="paymentType" value="card">
          Crédito à vista ou débito
        </md-radio>
      </div>
    </div>

    <div class="row">
      <div class="dt bs2 nowrap w-100">
        <!-- Pagamento e troco -->
        <currency-input-card
          v-if="paymentService === 'prepaid' && paymentType === 'money'"
          class="dtc w-50 pa1"
          :class="{ 'b--red': !isPaymentStepDone && alreadyBlurred }"
          :header="change > 0 ? 'Pagamento e troco*' : 'Pagamento*'"
          :value.sync="paymentValue"
          action-tooltip="Editar pagamento"
          @focusout="alreadyBlurred = true"
          @keydown="$event.key === '-' ? $event.preventDefault() : null"
        >
          <div>
            <div v-if="isPaymentStepDone && change > 0" class="f6 light-silver">
              <formatted-currency :value="change" />
            </div>

            <div v-if="!isPaymentStepDone && alreadyBlurred" class="red f6">
              Deve ser maior ou igual ao total
            </div>
          </div>
        </currency-input-card>

        <!-- Acréscimo ou desconto -->
        <currency-input-card
          class="dtc w-50 pa1"
          header="Acréscimo ou desconto"
          :value.sync="additionOrDiscount"
          action-tooltip="Editar acréscimo ou desconto"
        >
          <div v-if="additionOrDiscount > 0" class="f6 light-silver">
            Use o sinal (-) para descontos
          </div>

          <div v-if="additionOrDiscount < 0" class="f6 light-silver">
            Use o sinal (-) para acréscimos
          </div>
        </currency-input-card>
      </div>
    </div>

    <!-- Observações -->
    <div class="ph1">
      <title-card header="Observações">
        <Textarea
          v-model="note"
          class="w-100"
          placeholder="Justificativas de acréscimo e desconto ou observações em geral."
        />
      </title-card>
    </div>

    <required-field v-if="paymentType === 'money'" class="ph1 pv1" />

    <!-- Ações -->
    <step-actions class="ma1" :done="isPaymentStepDone" @next="GO_STEP(3)" @previous="GO_STEP(1)" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

import RequiredField from '@/components/CreateOrder/RequiredField.vue'
import StepActions from '@/components/CreateOrder/StepActions.vue'
import FormattedCurrency from '@/components/intl/FormattedCurrency.vue'
import CurrencyInputCard from '@/components/ui/CurrencyInputCard.vue'
import Textarea from '@/components/ui/Textarea.vue'
import TitleCard from '@/components/ui/TitleCard.vue'
import { mapGetterSetter } from '@/utils/mapGetterSetter'

const mapDataToPaymentProp = {
  paymentValue: 'value',
  paymentType: 'type',
  paymentService: 'service',
}

export default {
  components: {
    StepActions,
    Textarea,
    TitleCard,
    FormattedCurrency,
    RequiredField,
    CurrencyInputCard,
  },
  data() {
    return {
      alreadyBlurred: false,
      paymentValue: 0,
      paymentType: 'money',
      paymentService: 'prepaid',
    }
  },
  computed: {
    ...mapState('CreateOrder', ['address', 'additionOrDiscount', 'type']),
    ...mapGetters('CreateOrder', ['totalAmount', 'isPaymentStepDone', 'change']),
    ...mapGetterSetter('CreateOrder', {
      deliveryFee: 'SET_DELIVERY_FEE',
      payment: 'SET_PAYMENT',
      additionOrDiscount: 'SET_ADDITION_OR_DISCOUNT',
      note: 'SET_NOTE',
    }),
  },
  watch: {
    ...['paymentValue', 'paymentService', 'paymentType'].reduce((o, prop) => {
      o[prop] = function watcher(value) {
        const paymentProp = mapDataToPaymentProp[prop]
        this.payment[paymentProp] = value
      }
      return o
    }, {}),
  },
  mounted() {
    this.applyPaymentValue()
  },
  methods: {
    ...mapMutations('CreateOrder', ['GO_STEP']),
    applyPaymentValue() {
      this.paymentValue = this.payment.value
      this.paymentService = this.payment.service
      this.paymentType = this.payment.type
    },
  },
}
</script>

<style lang="scss" scoped>
.row {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
</style>
