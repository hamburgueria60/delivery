<template>
  <md-field>
    <template #label>Por período</template>

    <md-select v-slot="{ close, tabindex }" :value="label">
      <md-option
        v-for="(option, index) in byPeriodOptions"
        :key="option.value"
        :value="option.value"
        class="filters-button__option pa3"
        :tabindex="tabindex(index)"
        @select="handleSelectOption(option, { close })"
      >
        {{ option.label }}
      </md-option>
    </md-select>

    <template v-if="filterByPeriod === 'today'" #auxiliar>
      De 18:00 de hoje até 17:59 de amanhã
    </template>
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
      filterByPeriod: null,
      byPeriodOptions: [
        { value: 'today', label: 'Somente de hoje' },
        { value: 'yesterday', label: 'Até ontem' },
        { value: '7-days', label: 'Até 7 dias atrás' },
      ],
    }
  },
  computed: {
    options() {
      return this.byPeriodOptions
    },
    defaultOption() {
      return this.byPeriodOptions[0]
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
      this.filterByPeriod = option.value
      this.label = option.label
      this.$emit('update:value', option.value)
      close()
    },
  },
}
</script>

<style scoped lang="scss"></style>
