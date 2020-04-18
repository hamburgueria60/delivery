<template>
  <list-item class="pa3" v-bind="$attrs" v-on="$listeners">
    <slot />
  </list-item>
</template>

<script>
import ListItem from '@/components/ui/ListItem.vue'

export default {
  components: {
    ListItem,
  },
}
</script>

<style></style>
