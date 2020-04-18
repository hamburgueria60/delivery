<template>
  <title-card :header="header" @focusout="$emit('focusout')">
    <currency-input ref="input" class="mb1" currency="BRL" :value="value" @input="emitValueUpdate" />

    <slot></slot>
  </title-card>
</template>

<script>
import CurrencyInput from '@/components/ui/CurrencyInput.vue'
import TitleCard from '@/components/ui/TitleCard.vue'

export default {
  components: {
    CurrencyInput,
    TitleCard,
  },
  props: {
    actionTooltip: { type: String, default: '' },
    header: { type: String, default: '' },
    value: { type: Number, default: 0 },
    negative: { type: Boolean, default: true },
  },
  data() {
    return {}
  },
  methods: {
    emitValueUpdate(number) {
      this.$emit('update:value', number)
    },
  },
}
</script>
