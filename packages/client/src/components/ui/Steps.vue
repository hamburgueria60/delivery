<template>
  <div class="flex mv3">
    <div class="mr3" :class="{ [menuClass]: menuClass }">
      <step
        v-for="(step, index) in labels"
        ref="steps"
        :key="step"
        :step="step"
        :index="index"
        :blocked="isBlocked(index)"
        :done="isDone(index)"
        :current="isCurrent(step)"
        :bold="isBold({ step, index })"
        :can-interact="canInteract({ step, index })"
        @keydown.enter="handleClick({ step, index })"
        @click="handleClick({ step, index })"
      />

      <slot name="bottom" />
    </div>

    <div class="flex flex-auto">
      <slot />
    </div>
  </div>
</template>

<script>
import { last } from 'lodash'

import Step from '@/components/ui/Step.vue'

export default {
  components: {
    Step,
  },
  props: {
    menuClass: { type: String, default: '' },
    current: { type: Number, default: 0 },
    done: { type: Set, default: null },
    blocked: { type: Set, default: null },
    bold: { type: Set, default: null },
    labels: { type: Array, default: () => [] },
  },
  computed: {
    currentStep() {
      return this.labels[this.current]
    },
  },
  watch: {
    current() {
      this.$refs.steps[this.current]?.$el?.focus()
    },
  },
  methods: {
    canInteract({ index, step }) {
      return !this.isBlocked(index) && !this.isCurrent(step) && index <= this.lastDoneStep() + 1
    },
    isDone(index) {
      return this.done?.has(index)
    },
    isBlocked(index) {
      return this.blocked?.has(index)
    },
    isBold({ index, step }) {
      return this.bold?.has(index) && !this.isDone(index) && !this.isCurrent(step)
    },
    isCurrent(step) {
      return this.currentStep === step
    },
    lastDoneStep() {
      return last(Array.from(this.done))
    },
    handleClick({ step, index }) {
      if (this.canInteract({ index, step })) {
        this.changeStep(index)
      }
    },
    changeStep(index) {
      this.$listeners.change?.(index)
    },
  },
}
</script>
