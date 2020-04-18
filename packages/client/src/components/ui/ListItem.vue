<template>
  <navigation-item class="item" :class="{ navigable }" v-on="$listeners">
    <slot></slot>
  </navigation-item>
</template>

<script>
import NavigationItem from '@/components/ui/NavigationItem.vue'

export default {
  components: { NavigationItem },
  props: {
    navigable: { type: Boolean },
  },
}
</script>

<style scoped>
.item:hover,
.item.navigable:focus-within,
.item:focus-visible {
  background: var(--light-gray);
}
</style>
