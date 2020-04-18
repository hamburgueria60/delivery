<template>
  <title-card ref="card" class="card" :header="header" @focusout="handleBlur">
    <template #icons>
      <div class="flex items-center">
        <action
          v-if="showSearchButton"
          :class="{ vh: !typeStrategy.isActionsVisible() }"
          :tabindex="!typeStrategy.isActionsVisible() ? -1 : 0"
          aria-label="Buscar um item no cardápio"
          @select="enable"
        >
          <MaginifyIcon :title="''" :size="16" class="icon" />
        </action>

        <slot name="loading"></slot>
      </div>
    </template>

    <!-- relative: complement popper position -->
    <div style="position: relative">
      <Placeholder v-if="typeStrategy.placeholder()">
        Nenhum item selecionado
      </Placeholder>

      <popper :config="{ placement: 'bottom' }" v-if="typeStrategy.input()">
        <Input ref="input" data-target class="w-100" :placeholder="activePlaceholder" :value="value" v-on="listeners" />

        <div class="popper mt2 z-1 w-100" data-popper>
          <md-card class="scrolling overflow-auto" :style="{ maxHeight: popperHeight && `${popperHeight}px` }">
            <navigation v-if="value.length >= 3 && items.length > 0" v-slot="{ tabindex }" class="pv2">
              <slot name="items" v-bind="{ tabindex, select: handleSelect }">
                <list-item
                  v-for="(item, index) in items"
                  :key="get(item, options.id)"
                  :tabindex="tabindex(index)"
                  @select="handleSelect(item)"
                >
                  <div class="pv3 pl5">
                    <Highlight :query="value" :text="get(item, options.text)" />
                  </div>
                </list-item>
              </slot>
            </navigation>
          </md-card>
        </div>
      </popper>

      <div v-if="typeStrategy.displayChildren()">
        <slot></slot>
      </div>
    </div>
  </title-card>
</template>

<script>
import { get, pick } from 'lodash'
import MaginifyIcon from 'vue-material-design-icons/Magnify.vue'

import Action from '@/components/ui/Action.vue'
import Highlight from '@/components/ui/Highlight.vue'
import Input from '@/components/ui/Input.vue'
import ListItem from '@/components/ui/ListItem.vue'
import Navigation from '@/components/ui/Navigation.vue'
import Placeholder from '@/components/ui/Placeholder.vue'
import Popper from '@/components/ui/Popper.vue'
import TitleCard from '@/components/ui/TitleCard.vue'
import { getSelectTypeStrategy, mapSetters } from '@/strategies/SelectInputCard'

export default {
  components: {
    Navigation,
    ListItem,
    Action,
    Highlight,
    Input,
    MaginifyIcon,
    Placeholder,
    Popper,
    TitleCard,
  },
  props: {
    popperHeight: { type: String, default: undefined },
    value: { type: String, default: '' },
    header: { type: String, default: '' },
    items: { type: Array, default: () => [] },
    empty: { type: Boolean, default: true },
    loading: { type: Boolean, default: true },
    options: { type: Object, default: () => ({ text: '', id: '' }) },
    activePlaceholder: {
      type: String,
      default: 'Digite para escolher um item',
    },
    type: {
      type: String,
      default: 'single',
      validator: type => ['single', 'multi'].includes(type),
    },
    showSearchButton: { type: Boolean },
  },
  data() {
    return {
      active: !this.showSearchButton,
      typeStrategy: getSelectTypeStrategy(this.type),
    }
  },
  computed: {
    listeners() {
      return pick(this.$listeners, 'input')
    },
  },
  watch: {
    ...mapSetters(['active', 'empty', 'loading']),
  },
  mounted() {
    this.typeStrategy.active = this.active
    this.typeStrategy.empty = this.empty
    this.typeStrategy.loading = this.loading
    this.typeStrategy.showSearchButton = this.showSearchButton
  },
  methods: {
    get,
    focusInput() {
      if (this.$refs.input) this.$refs.input.$el.focus()
    },
    async enable() {
      this.active = true
      await this.$nextTick()
      this.focusInput()
    },
    reset() {
      this.$emit('input', '')
      this.$emit('update:value', '')
    },
    handleBlur() {
      this.reset()
      this.active = this.typeStrategy.changeActiveWhenBlur()
    },
    handleSelect(item) {
      this.active = this.typeStrategy.changeActiveWhenBlur()
      this.typeStrategy.empty = false

      this.$emit('select', item)
      this.reset()
      this.focusInput()
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  min-height: 79.5px;
}
.scrolling {
  max-height: calc(256px);
}
</style>
