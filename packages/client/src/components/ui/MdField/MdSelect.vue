<template>
  <click-or-focus-outside id="md-select" :disabled="!visible" @outside="visible = false">
    <v-popover
      ref="popover"
      open
      class="md-select"
      popover-class="md-select__tooltip"
      trigger="manual"
      :container="false"
      :popper-options="popperOptions"
      :auto-hide="false"
      @apply-show="handleShow"
    >
      <div
        tabindex="0"
        class="input-border md-select__target hover-bg-light-gray bn bg-near-white bb w-100 br--top br2"
        :class="{
          'b--blue': visible,
          'hover-b-mid-gray b--moon-gray': !visible,
        }"
        @click="toggleOnClick"
        @keydown.enter="toggleOnPressEnter"
      >
        <div
          class="input-border flex pointer pv2 pl3 pr1 bb"
          :class="{
            'b--blue': visible,
            'b--transparent': !visible,
          }"
        >
          <input :value="value" class="flex-1 pointer bg-transparent bn dark-gray" disabled />
          <menu-down class="flex-shrink-0" />
        </div>
      </div>

      <template #popover>
        <navigation
          ref="navigation"
          v-slot="{ tabindex }"
          :class="{ 'dn o-0': !visible }"
          class="bg-white popover non-selectable br--bottom br2"
        >
          <!-- :selectOption="selectOption"
          :isSelected="isSelected"
          :selected="selected" -->
          <slot :tabindex="tabindex" :close="close" />
        </navigation>
      </template>
    </v-popover>
  </click-or-focus-outside>
</template>

<script>
import { get } from 'lodash'
import MenuDown from 'vue-material-design-icons/MenuDown.vue'

import ClickOrFocusOutside from '@/components/ui/ClickOrFocusOutside.vue'
import Navigation from '@/components/ui/Navigation.vue'
import autoSizing from '@/utils/autoSizing'

export default {
  components: {
    ClickOrFocusOutside,
    Navigation,
    MenuDown,
  },
  props: {
    multiple: { type: Boolean },
    value: { type: String, default: '' },
  },
  data() {
    return {
      // selected: this.value,
      visible: false,
      popperOptions: { modifiers: { autoSizing } },
    }
  },
  computed: {
    // options() {
    //   return this.$slots.default;
    // },
    // selectOption() {
    //   switch (this.multiple) {
    //     case false:
    //       return option => this.selectSingleOption(option);
    //     case true:
    //       return option => this.selectMultipleOption(option);
    //   }
    //   return null;
    // },
    // selectedOption() {
    //   return this.multiple
    //     ? Array.from(this.selected?.values() || []).join(", ")
    //     : get(this.selected, "label");
    // },
  },
  mounted() {
    this.$refs.popover?.$refs.popover?.addEventListener('focus', this.handleInnerPopoverFocus)
  },
  beforeDestroy() {
    this.$refs.popover?.$refs.popover?.removeEventListener('focus', this.handleInnerPopoverFocus)

    this.observer?.disconnect()
  },
  methods: {
    get,

    async handleShow() {
      if (this.visible) {
        await this.focusFirstChild()
      }
    },

    toggleOnPressEnter() {
      this.toggle()
    },

    toggleOnClick() {
      this.toggle()
    },

    async toggle() {
      this.visible = !this.visible
      await this.focusFirstChild()

      if (!this.visible) {
        this.$emit('close')
      } else {
        this.$emit('open')
      }
    },

    close() {
      this.visible = false
    },

    // isSelected(option) {
    //   if (this.multiple) {
    //     return this.selected?.has(option.value);
    //   } else {
    //     return this.selected?.value === option.value;
    //   }
    // },

    // selectSingleOption(option) {
    //   this.visible = false;
    //   this.selected = option;
    //   this.$emit("update:value", this.selected);
    // },

    // selectMultipleOption(option) {
    //   this.visible = true;
    //   this.selected = this.selected || new Set();

    //   if (this.isSelected(option)) {
    //     this.selected.delete(option.value);
    //   } else {
    //     this.selected.add(option.value);
    //   }

    //   this.selected = new Set(this.selected);
    //   this.$emit("update:value", this.selected);
    // },

    async focusFirstChild() {
      await this.$nextTick()
      this.$refs.navigation.$el.children[0].focus()
    },
  },
}
</script>

<style lang="scss" scoped>
.popover {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.md-select {
  &__target {
    &:focus-open {
      background-color: var(--light-gray);
    }
  }
}

.error {
  .input-border {
    border-color: var(--dark-red);
  }
}
</style>

<style lang="scss">
.md-select .md-select__tooltip {
  margin-top: 0;
}
</style>
