<template>
  <selectable component="li" class="pointer" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </selectable>
</template>

<script>
import Selectable from '@/components/ui/Selectable.vue'

export default {
  components: {
    Selectable,
  },
}
</script>
