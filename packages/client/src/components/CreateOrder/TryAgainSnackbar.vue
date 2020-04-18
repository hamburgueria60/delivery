<template>
  <md-snackbar :md-duration="Infinity" :md-active="mdActive" @update:mdActive="handleUpdate">
    <span v-if="!$slots.default" class="lh-copy">
      Oops, não consegui trazer as informações que você pediu.
    </span>
    <slot></slot>

    <Button flat class="blue flex-shrink-0" @click="$emit('click')">
      Tentar novamente
    </Button>
  </md-snackbar>
</template>

<script>
import Vue from 'vue'
import MdSnackbar from 'vue-material/dist/components/MdSnackbar'

import Button from '@/components/ui/Button.vue'

Vue.use(MdSnackbar)

export default {
  components: { Button },
  props: { mdActive: { type: Boolean } },
  methods: {
    handleUpdate(mdActive) {
      this.$emit('update:mdActive', mdActive)
    },
  },
}
</script>

<style lang="scss" scoped>
.md-snackbar {
  background: var(--dark-red);
}
</style>
