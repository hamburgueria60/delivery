<template>
  <div>
    <ul ref="items" @keydown="handleKeydown">
      <v-node
        v-for="(item, index) in items"
        :key="item._uid"
        :context="$parent"
        :node="item"
        @focus="handleChildFocus(item, index)"
      />
    </ul>
  </div>
</template>

<script>
import isNil from 'lodash/isNil'

import VNode from '@/components/ui/VNode'

export default {
  name: 'Navigation',
  components: {
    VNode,
  },
  props: {
    activeClass: { type: String, default: '' },
    direction: { type: String, default: 'vertical' },
    focusOnFirstGrandchild: { type: Boolean },
  },
  data() {
    return { focused: -1, listeners: [] }
  },
  computed: {
    items() {
      return this.$slots.default || []
    },
  },
  mounted() {
    this.applyChildrenBehavior()
  },
  updated() {
    this.applyChildrenBehavior()
  },
  methods: {
    handleChildFocus(_, index) {
      this.focused = index
    },
    async applyChildrenBehavior() {
      await this.$nextTick()

      const slot = this.$refs.items.children
      const { length } = slot

      for (let index = 0; index < length; index++) {
        const el = slot[index]

        if (this.focusOnFirstGrandchild) {
          el.children[0].tabIndex = index === 0 ? 0 : -1
        } else {
          el.tabIndex = index === 0 ? 0 : -1
        }
      }
    },
    handleKeydown(e) {
      let index
      const length = this.$slots.default ? this.$slots.default.length : 0

      const forwardKey =
        (this.direction === 'vertical' && 'ArrowDown') || (this.direction === 'horizontal' && 'ArrowRight')

      const backwardKey =
        (this.direction === 'vertical' && 'ArrowUp') || (this.direction === 'horizontal' && 'ArrowLeft')

      switch (e.code) {
        case forwardKey: {
          e.preventDefault()
          e.stopPropagation()
          index = Math.min(length - 1, this.focused + 1)
          break
        }
        case backwardKey: {
          e.preventDefault()
          e.stopPropagation()
          index = Math.max(0, this.focused - 1)
          break
        }
        case 'Home': {
          e.preventDefault()
          e.stopPropagation()
          index = 0
          break
        }
        case 'End': {
          e.preventDefault()
          e.stopPropagation()
          index = length - 1
          break
        }
      }

      if (!isNil(index)) {
        this.focused = index
        this.$refs.items.children[index].focus()
      }
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}
li:focus {
  outline: none;
}
</style>
