<template>
  <component :is="component" @focus="$emit('focus')" @click="$emit('select')" @keydown.enter="$emit('select')">
    <slot />
  </component>
</template>

<script>
export default {
  props: { component: { type: String, default: 'div' } },
}
</script>

<style></style>
