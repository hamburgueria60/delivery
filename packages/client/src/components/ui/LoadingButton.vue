<template>
  <Button class="flex items-center justify-center relative" :disabled="loading" v-bind="$attrs" v-on="$listeners">
    <div class="absolute center w-100 h-100 flex items-center justify-center">
      <Loading v-if="loading" class="ma-auto dib" />
    </div>
    <span :class="{ vh: loading }"><slot></slot></span>
  </Button>
</template>

<script>
import Button from '@/components/ui/Button.vue'
import Loading from '@/components/ui/Loading.vue'

export default {
  components: {
    Loading,
    Button,
  },
  props: {
    loading: Boolean,
  },
}
</script>

<style></style>
