<template>
  <span>{{ formatted }}</span>
</template>

<script>
import Locale from './index'

export default {
  props: {
    value: { type: Number, default: 0, required: true },
  },
  data() {
    return { formatted: '' }
  },
  watch: {
    value() {
      this.format()
    },
  },
  mounted() {
    this.format()
  },
  methods: {
    format() {
      const formatter = new Intl.NumberFormat(Locale.getLocale(), {
        style: 'currency',
        currency: Locale.getCurrency(),
      })
      this.formatted = formatter.format(this.value)
    },
  },
}
</script>

<style></style>
