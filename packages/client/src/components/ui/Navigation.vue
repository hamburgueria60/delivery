<template>
  <ul ref="items" @focusin="handleFocus" @focusout="handleBlur" @keydown="handleKeyDown">
    <slot v-bind="props"></slot>
  </ul>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'vertical',
      validator: val => ['vertical', 'horizontal'].includes(val),
    },
  },
  data() {
    return {
      focused: 0,
    }
  },
  computed: {
    handlers() {
      return {
        vertical: { next: 'ArrowDown', previous: 'ArrowUp' },
        horizontal: { next: 'ArrowRight', previous: 'ArrowLeft' },
      }
    },
    focusedChild() {
      return this.$refs.items?.children[this.focused]
    },
    props() {
      return { tabindex: this.tabindex, focused: this.focused }
    },
  },
  watch: {
    focused(focused) {
      const focusedChild = this.$refs.items?.children[focused]
      focusedChild?.focus()
    },
  },
  methods: {
    tabindex(index) {
      return index <= 0 ? 0 : -1
    },

    handleKeyDown(e) {
      const handlers = this.handlers[this.direction]
      const allowedKeys = Object.values(handlers)
      if (allowedKeys.includes(e.key)) this.handleArrowKeyDown(e)
    },

    handleArrowKeyDown(e) {
      e.stopPropagation()
      e.preventDefault()

      const handlers = this.handlers[this.direction]

      switch (e.key) {
        case handlers.next: {
          this.next()
          break
        }
        case handlers.previous: {
          this.previous()
          break
        }
      }
    },

    next() {
      if (this.focused + 1 < this.$scopedSlots.default(this.props).length) {
        this.focused += 1
      }
    },

    previous() {
      if (this.focused - 1 >= 0) {
        this.focused -= 1
      }
    },

    handleFocus(e) {
      const el = this.$refs.items
      const target = e.relatedTarget

      if (target && !el.contains(target)) {
        this.focused = 0
      }
    },

    handleBlur(e) {
      const el = this.$refs.items
      const target = e.relatedTarget

      if (target && !el.contains(target)) {
        this.focused = null
      }
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}
li:focus {
  outline: none;
}
</style>
