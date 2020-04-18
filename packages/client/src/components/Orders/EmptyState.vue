<template>
  <div class="flex flex-column ma4 mh-auto">
    <img v-if="image" :src="image" class="image" />

    <span class="mt3 gray tc">
      <div v-for="(message, i) in messages" :key="i" class="mb1">
        {{ message }}
      </div>
    </span>
  </div>
</template>

<script>
import emptyState from '@/images/empty-state.svg'

export default {
  data() {
    return {
      image: emptyState,
      messages: ['Está meio vazio aqui, não?', 'Parece que nenhum pedido ainda foi feito.'],
    }
  },
}
</script>

<style lang="scss" scoped>
.image {
  height: var(--height-4);
}
</style>
