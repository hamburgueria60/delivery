<template>
  <md-field>
    <template #label>Por tipo de pedido</template>
    <md-select v-slot="{ close, tabindex }" :value="label">
      <md-option
        v-for="(option, index) in options"
        :key="option.value"
        :tabindex="tabindex(index)"
        :value="option.value"
        class="filters-button__option pa3"
        @select="handleSelectOption(option, { close })"
      >
        {{ option.label }}
      </md-option>
    </md-select>
  </md-field>
</template>

<script>
import MdField from '@/components/ui/MdField/MdField.vue'
import MdOption from '@/components/ui/MdField/MdOption.vue'
import MdSelect from '@/components/ui/MdField/MdSelect.vue'

export default {
  components: {
    MdField,
    MdSelect,
    MdOption,
  },
  props: {
    value: { type: String, default: null },
  },
  data() {
    return {
      label: null,
      filterByType: null,
      byType: [
        { value: 'all', label: 'Todos' },
        { value: 'delivery', label: 'Delivery' },
        { value: 'restaurant', label: 'Restaurante' },
      ],
    }
  },
  computed: {
    options() {
      return this.byType
    },
    defaultOption() {
      return this.byType[0]
    },
  },
  created() {
    if (!this.value) {
      this.$emit('update:value', this.defaultOption.value)
    }

    const option = this.options.find(option => option.value === this.value) || this.defaultOption

    this.label = option?.label
  },
  methods: {
    handleSelectOption(option, { close }) {
      this.filterByType = option.value
      this.label = option.label
      this.$emit('update:value', option.value)
      close()
    },
  },
}
</script>

<style scoped lang="scss"></style>
