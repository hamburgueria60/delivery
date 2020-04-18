<template>
  <div class="avatar br-100" :style="{ height: `${size}px`, width: `${size}px` }">
    <div class="flex items-center justify-center h-100">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: { type: Number, default: 40 },
  },
}
</script>
