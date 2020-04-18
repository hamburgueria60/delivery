<template>
  <v-popover ref="popover" :open.sync="open" @apply-hide="handleHide">
    <slot></slot>

    <template #popover>
      <form @submit.prevent="handleSubmit">
        <currency-input-card
          ref="inputCard"
          class="dtc pa1"
          header="Acréscimo ou desconto"
          :value.sync="additionOrDiscount"
          action-tooltip="Editar acréscimo ou desconto"
        >
          <div v-if="additionOrDiscount > 0" class="f6 light-silver">
            Use o sinal (-) para descontos
          </div>

          <div v-if="additionOrDiscount < 0" class="f6 light-silver">
            Use o sinal (-) para acréscimos
          </div>
        </currency-input-card>
      </form>
    </template>
  </v-popover>
</template>

<script>
import { mapMutations } from 'vuex'

import CurrencyInputCard from '@/components/ui/CurrencyInputCard.vue'

export default {
  components: {
    CurrencyInputCard,
  },
  props: {
    item: { type: Object },
  },
  data() {
    return {
      open: false,
      additionOrDiscount: this.item.additionOrDiscount,
    }
  },
  mounted() {
    this.$watch(
      () => this.$refs.popover.isOpen,
      async isOpen => {
        if (isOpen) {
          await this.$nextTick()
          const input = this.$refs.inputCard.$el.querySelector('input')
          input.focus()
        }
      },
    )
  },
  methods: {
    ...mapMutations('CreateOrder', {
      setItemAdditionOrDiscount: 'SET_ITEM_ADDITION_OR_DISCOUNT',
    }),
    persist() {
      this.close()
      if (this.item.additionOrDiscount !== this.additionOrDiscount) {
        this.setItemAdditionOrDiscount({
          item: this.item,
          amount: this.additionOrDiscount,
        })
      }
    },
    close() {
      this.open = false
    },
    handleHide() {
      this.persist()
      this.close()
    },
    handleSubmit() {
      this.persist()
      this.close()
    },
  },
}
</script>

<style></style>
