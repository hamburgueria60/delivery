<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import Popper from 'popper.js'

export default {
  name: 'Popper',
  props: {
    config: {
      type: Object,
      default: () => ({ placement: 'bottom' }),
    },
  },
  data() {
    return {
      targetEl: null,
      popperEl: null,
      popper: null,
    }
  },
  mounted() {
    this.targetEl = this.$el.querySelector('[data-target]')
    this.popperEl = this.$el.querySelector('[data-popper]')
    this.setup()
  },
  updated() {
    this.popper?.scheduleUpdate()
  },
  beforeDestroy() {
    if (!this.popper) {
      return
    }

    this.popper.destroy()
  },
  methods: {
    setup() {
      if (!this.popper) {
        this.popper = new Popper(this.targetEl, this.popperEl, this.config)
      } else {
        this.popper.scheduleUpdate()
      }
    },
  },
}
</script>
