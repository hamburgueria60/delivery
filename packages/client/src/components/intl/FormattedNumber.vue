<template>
  <span>{{ formatted }}</span>
</template>

<script>
import Locale from './index'

export default {
  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 2 },
    max: { type: Number, default: 2 },
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
        maximumFractionDigits: this.max,
        minimumFractionDigits: this.min,
      })
      this.formatted = formatter.format(this.value)
    },
  },
}
</script>

<style></style>
