<template>
  <div class="flex flex-column flex-row-mm mt3">
    <div class="flex flex-column mt2 mt0-mm mr2-mm">
      <cancel-button />
    </div>

    <Button
      v-if="Boolean($listeners.previous)"
      class="mt2 mt0-mm mr2-mm ml-auto-mm"
      outlined
      @click="$emit('previous')"
    >
      Voltar
    </Button>

    <Button
      v-if="Boolean($listeners.next)"
      class="mt2 mt0-mm"
      :class="{ 'ml-auto-mm': !Boolean($listeners.previous) }"
      filled
      :disabled="!done"
      @click="$emit('next')"
    >
      Avançar
    </Button>
  </div>
</template>

<script>
import CancelButton from '@/components/CreateOrder/CancelButton.vue'
import Button from '@/components/ui/Button.vue'

export default {
  components: {
    CancelButton,
    Button,
  },
  props: {
    done: { type: Boolean, required: true },
  },
}
</script>

<style></style>
