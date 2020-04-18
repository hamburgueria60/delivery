<template>
  <Card ref="card" @focusout.native="handleFocusOut" @keydown.native="$emit('keydown', $event)">
    <div class="ma3">
      <div class="flex items-center justify-between gray h1">
        <div class="dib ttu tracked f7 gray">{{ header }}</div>
        <slot name="icons"></slot>
      </div>

      <div class="mt2">
        <slot></slot>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from './Card.vue'

export default {
  components: { Card },
  props: { header: { type: String, default: '' } },
  methods: {
    handleFocusOut(e) {
      const parent = this.$refs.card?.$el
      const target = e.relatedTarget

      if (!target || !parent?.contains(target)) {
        this.$emit('focusout')
      }
    },
  },
}
</script>
