<template>
  <md-field :class="{ error }">
    <template #label>
      <span class="label">Por status</span>
    </template>

    <md-select v-slot="{ tabindex }" :class="{ error }" :value="label" multiple>
      <md-option
        v-for="(option, index) in options"
        :key="option.value"
        :tabindex="tabindex(index)"
        @select="handleSelectOption(option)"
      >
        <md-checkbox
          :value="option.value"
          :checked="isStatusChecked(option)"
          class="filters-button__option checkbox flex items-center w100"
        >
          {{ option.label }}
        </md-checkbox>
      </md-option>
    </md-select>

    <template #auxiliar>
      <div :class="{ vh: !error }">
        Selecione um status
      </div>
    </template>
  </md-field>
</template>

<script>
import MdCheckbox from '@/components/ui/MdCheckbox.vue'
import MdField from '@/components/ui/MdField/MdField.vue'
import MdOption from '@/components/ui/MdField/MdOption.vue'
import MdSelect from '@/components/ui/MdField/MdSelect.vue'
import Status from '@/types/Status'

export default {
  components: {
    MdField,
    MdSelect,
    MdOption,
    MdCheckbox,
  },
  props: {
    value: { type: Set, default: null },
  },
  data() {
    return {
      label: '',
      filterByStatus: this.value || new Set(['all', Status.Draft, Status.Received, Status.Ready, Status.Done]),
      byStatus: new Map([
        ['all', { value: 'all', label: 'Todos' }],
        [Status.Draft, { value: Status.Draft, label: 'Rascunho' }],
        [Status.Received, { value: Status.Received, label: 'Recebido' }],
        [Status.Ready, { value: Status.Ready, label: 'Pronto' }],
        [Status.Done, { value: Status.Done, label: 'Finalizado' }],
      ]),
    }
  },
  computed: {
    options() {
      return Array.from(this.byStatus.values())
    },
    error() {
      return this.filterByStatus.size === 0
    },
  },
  watch: {
    error(value, prevValue) {
      if (value !== prevValue) {
        this.$emit('error', this.error)
      }
    },
  },
  created() {
    if (!this.value) {
      this.$emit('update:value', this.filterByStatus)
    }

    this.label = this.getLabel()
  },
  methods: {
    handleSelectOption(option) {
      this.filterByStatus = this.filterByStatus || new Set()
      if (option.value === 'all') {
        this.filterByStatus = this.handleSelectAllOption(option)
      } else {
        this.filterByStatus = this.handleOtherOptions(option)
      }

      this.label = this.getLabel()
      this.filterByStatus = new Set(this.filterByStatus)

      this.$emit('select', this.filterByStatus)
      this.$emit('update:value', this.filterByStatus)
    },

    handleSelectAllOption(option) {
      const isRemoving = this.isStatusChecked(option)
      const isAdding = !isRemoving

      if (isAdding) {
        return this.selectAllOptions()
      }
      return new Set()
    },

    handleOtherOptions(option) {
      let { filterByStatus } = this
      const isRemoving = this.isStatusChecked(option)

      if (isRemoving) {
        filterByStatus.delete(option.value)

        if (filterByStatus.has('all')) {
          filterByStatus.delete('all')
        }
      } else {
        filterByStatus.add(option.value)

        const isOnlyMissingAllOption = !filterByStatus.has('all') && filterByStatus.size === this.byStatus.size - 1

        if (isOnlyMissingAllOption) {
          filterByStatus = this.selectAllOptions()
        }
      }

      return filterByStatus
    },

    isStatusChecked(option) {
      return this.filterByStatus?.has(option.value)
    },

    selectAllOptions() {
      return new Set(['all', Status.Draft, Status.Received, Status.Ready, Status.Done])
    },

    getLabel() {
      if (this.filterByStatus?.has('all')) {
        return this.byStatus.get('all').label
      }

      return (
        Array.from(this.filterByStatus || [])
          .map(option => this.byStatus.get(option).label)
          .join(', ') || 'Nenhum'
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
