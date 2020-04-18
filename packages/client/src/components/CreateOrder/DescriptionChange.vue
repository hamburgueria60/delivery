<template>
  <v-popover ref="popover" :open.sync="open" @apply-hide="handleHide">
    <slot></slot>

    <template #popover>
      <form @submit.prevent="handleSubmit">
        <title-card
          class="pa1"
          :header="
            `${plural(item.quantity, 'Complemento para o item', 'Complemento para os itens')} (${item.quantity})`
          "
        >
          <Input
            ref="input"
            :value.sync="description"
            maxlength.native="125"
            placeholder="Calabresa, muçarela, adicional de queijo, etc."
            class="ttc input mt2"
          />
        </title-card>
      </form>
    </template>
  </v-popover>
</template>

<script>
import { mapMutations } from 'vuex'

import Input from '@/components/ui/Input.vue'
import TitleCard from '@/components/ui/TitleCard.vue'
import plural from '@/utils/plural'

export default {
  components: {
    Input,
    TitleCard,
  },
  props: {
    item: { type: Object, default: null },
  },
  data() {
    return {
      open: false,
      description: this.item.description,
    }
  },
  mounted() {
    this.$watch(
      () => this.$refs.popover.isOpen,
      async isOpen => {
        if (isOpen) {
          await this.$nextTick()
          const input = this.$refs.input.$el
          input.focus()
        }
      },
    )
  },
  methods: {
    plural,
    ...mapMutations('CreateOrder', {
      setDescription: 'SET_DESCRIPTION',
    }),
    persist() {
      this.close()
      if (this.item.description !== this.description) {
        this.setDescription({
          item: this.item,
          description: this.description,
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

<style lang="scss" scoped></style>
