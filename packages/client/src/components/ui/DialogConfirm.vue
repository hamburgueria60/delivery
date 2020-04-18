<template>
  <md-dialog v-bind="$attrs" :md-fullscreen="false" v-on="$listeners">
    <div class="pa4 pb2">
      <div class="f4 fw5 b">
        {{ header }}
      </div>

      <div class="f5 ma3 mb4 mh0 lh-copy">
        <slot></slot>
      </div>
    </div>

    <focus-trap>
      <div class="flex pa3 pt0">
        <Button outlined class="mr2 ml-auto" :disabled="loading" @click="onCancel">
          {{ cancelText }}
        </Button>

        <loading-button filled :class="confirmClass" :loading="loading" @click="onConfirm">
          {{ confirmText }}
        </loading-button>
      </div>
    </focus-trap>
  </md-dialog>
</template>

<script>
import FocusTrap from 'vue-focus-lock'

import Button from '@/components/ui/Button.vue'
import LoadingButton from '@/components/ui/LoadingButton.vue'

export default {
  components: {
    LoadingButton,
    Button,
    FocusTrap,
  },
  props: {
    header: { type: String, default: '', required: true },
    confirmText: { type: String, default: '', required: true },
    confirmClass: { type: String, default: '' },
    cancelText: { type: String, default: '', required: true },
    loading: { type: Boolean },
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onConfirm() {
      this.$emit('confirm')
    },
  },
}
</script>

<style scoped></style>
