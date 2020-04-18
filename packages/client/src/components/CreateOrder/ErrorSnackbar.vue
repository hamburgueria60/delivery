<template>
  <md-snackbar v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </md-snackbar>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.md-snackbar {
  background: var(--dark-red);
}
</style>
