<template>
  <div ref="container">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean },
    except: { type: String, default: '' },
  },
  mounted() {
    document.body.addEventListener('click', this.handleClickOutside)
    document.body.addEventListener('focusin', this.handleFocusOutside)
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.handleClickOutside)
    document.body.removeEventListener('focusin', this.handleFocusOutside)
  },
  methods: {
    handleOutside(e) {
      const el = this.$refs.container
      const exceptions = this.except ? document.querySelectorAll(this.except) : []

      const isException = Array.from(exceptions).some(exception => exception && exception.contains(e.target))
      const isOutside = !el.contains(e.target) && !isException

      if (isOutside && !this.disabled) this.$emit('outside')
    },
    handleClickOutside(e) {
      this.handleOutside(e, 'click')
    },
    handleFocusOutside(e) {
      this.handleOutside(e, 'focusin')
    },
  },
}
</script>

<style></style>
