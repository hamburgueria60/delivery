<template>
  <component
    :is="tag"
    v-tooltip="ariaLabel"
    class="container pointer"
    tabindex="0"
    @click="handleSelect"
    @keydown.enter="handleSelect"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    ariaLabel: { type: String, default: '' },
    tag: { type: String, default: 'div' },
  },
  methods: {
    handleSelect(e) {
      this.$emit('select', e)
    },
  },
}
</script>

<style scoped lang="scss">
.container:focus-visible svg {
  border-radius: 100%;
  background: #6e96e5;
  box-shadow: 0 0 20px 11px #357edd;
  color: var(--white);
}
</style>
