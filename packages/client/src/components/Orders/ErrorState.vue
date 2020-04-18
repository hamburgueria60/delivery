<template>
  <div v-if="error" class="flex flex-column ma4 mh-auto">
    <img v-if="image" :src="image" class="image" />

    <span class="mt3 gray tc">
      <div v-for="(message, i) in messages" :key="i" class="mb1">
        {{ message }}
      </div>
      <pre v-if="code" class="dib pa3 bg-light-gray">{{ code }}</pre>
    </span>

    <div class="tc">
      <Button outlined @click="tryAgain()">Tentar novamente</Button>
    </div>
  </div>
</template>

<script>
import { includes } from 'lodash'

import Button from '@/components/ui/Button.vue'
import genericErrorState from '@/images/generic-error-state.svg'
import networkErrorState from '@/images/network-error-state.svg'

export default {
  components: { Button },
  props: {
    error: {
      validator: prop => typeof prop === 'object' || prop === null,
      default: undefined,
      required: true,
    },
  },
  data() {
    return {
      image: '',
      messages: [],
      code: '',
    }
  },
  created() {
    this.format()
    this.$watch('error', () => this.format())
  },
  methods: {
    tryAgain() {
      this.$emit('try-again')
    },
    format() {
      const { networkError } = this.error.instance

      if (includes(networkError.message, 'Network error')) {
        this.formatNetworkError()
      } else {
        this.formatServerError()
      }
    },
    formatServerError() {
      const { networkError } = this.error.instance
      this.code = networkError.id
      this.image = genericErrorState
      this.messages = ['Algo errado aconteceu com o serviço', 'Contate o suporte com o código:']
    },
    formatNetworkError() {
      const { networkError } = this.error.instance
      this.image = networkErrorState
      this.messages = [
        'Não foi possível conectar ao servidor',
        !navigator.onLine
          ? 'Verifique sua conexão com a internet.'
          : 'Verifique sua conexão com a internet ou contate o suporte com o código:',
      ].filter(Boolean)

      if (navigator.onLine) this.code = networkError?.id
    },
  },
}
</script>

<style lang="scss" scoped>
.image {
  height: var(--height-4);
}
</style>
