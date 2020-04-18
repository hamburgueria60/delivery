<template>
  <Input ref="input" v-model="formattedValue" v-bind="$attrs" v-on="listeners" @input="formatCurrency" />
</template>

<script>
import { omit } from 'lodash'

import Input from '@/components/ui/Input.vue'
import { currencyToNumber, getAbsoluteValue, getMathSignal, numberToCurrency } from '@/utils/numberUtils'

export default {
  components: {
    Input,
  },
  props: {
    value: { type: [Number, String], default: 0 },
  },
  data() {
    return { formattedValue: numberToCurrency(this.value) }
  },
  computed: {
    listeners() {
      return omit(this.$listeners, 'input')
    },
  },
  watch: {
    value() {
      this.formatCurrency(this.value)
    },
  },
  methods: {
    formatCurrency(value) {
      const absoluteValue = getAbsoluteValue(value)
      const absoluteNumber = currencyToNumber(absoluteValue) || 0
      const mathSignalMultiplier = getMathSignal(value, absoluteNumber)
      const numberWithFixedMathSignal = mathSignalMultiplier * absoluteNumber
      const currency = numberToCurrency(numberWithFixedMathSignal)

      if (value !== numberWithFixedMathSignal || this.formattedValue !== currency) {
        this.formattedValue = currency
        this.$emit('input', numberWithFixedMathSignal)
      }
    },
  },
}
</script>

<style></style>
