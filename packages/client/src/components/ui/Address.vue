<template>
  <div ref="address" v-tooltip="tooltip" class="truncate">
    {{ format(address) }}
  </div>
</template>

<script>
import { formatAddressSingleLine } from '@/utils/formatAddress'

export default {
  props: {
    address: { type: Object, default: null },
    type: { type: String, default: 'one-line' },
  },
  data() {
    return {
      tooltip: '',
    }
  },
  watch: {
    address() {
      this.applyTooltip()
    },
  },
  mounted() {
    this.applyTooltip()
  },
  methods: {
    format(address) {
      switch (this.type) {
        case 'one-line':
          return formatAddressSingleLine(address)
      }
    },
    applyTooltip() {
      this.tooltip = this.isEllipsisActive(this.$refs.address) ? this.format(this.address) : null
    },
    isEllipsisActive(element) {
      return element && element.offsetWidth !== element.scrollWidth
    },
  },
}
</script>

<style></style>
