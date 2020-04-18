<template>
  <div v-bind="$attrs" v-on="$listeners">
    <div class="label mb2 f6 mid-gray pl3">
      <slot name="label" />
    </div>

    <slot />

    <div class="auxiliar mt1 f6 pl3 gray">
      <slot name="auxiliar" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.error {
  .label,
  .auxiliar {
    color: var(--dark-red);
  }
}
</style>
