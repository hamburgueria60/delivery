<template>
  <v-popover
    placement="bottom-start"
    :container="false"
    :open.sync="open"
    trigger="manual"
    :auto-hide="false"
    @hide="reset()"
  >
    <Button :class="{ pressed: open }" outlined class="filters-button mr2" @click="openFilters">
      <div class="flex justify-center items-center" tabindex="-1"><filter-icon class="mr2" /> Filtros</div>
    </Button>

    <template #popover>
      <click-or-focus-outside
        v-if="open"
        except=".filters-button, .filters-button__option"
        @outside="dismissFiltersChange"
      >
        <div v-if="open" class="bg-white shadow-5 popper">
          <div class="flex flex-column pa4 pb3">
            <Button class="ml-auto" outlined :disabled="disabled" @click="applyFilters()">
              Aplicar filtros
            </Button>

            <div class="filters flex flex-column justify-between">
              <div class="select mt3">
                <period-select class="w-100" :value.sync="currentFilter.selectedPeriod" />
              </div>

              <div class="select mt3">
                <order-type-select :value.sync="currentFilter.selectedOrderType" />
              </div>

              <div class="mt3">
                <status-select :value.sync="currentFilter.selectedStatus" @error="handleError" />
              </div>
            </div>
          </div>
        </div>
      </click-or-focus-outside>
    </template>
  </v-popover>
</template>

<script>
import { cloneDeep } from 'lodash'
import FilterIcon from 'vue-material-design-icons/FilterVariant.vue'

import OrderTypeSelect from '@/components/Orders/OrderTypeSelect.vue'
import PeriodSelect from '@/components/Orders/PeriodSelect.vue'
import StatusSelect from '@/components/Orders/StatusSelect.vue'
import Button from '@/components/ui/Button.vue'
import ClickOrFocusOutside from '@/components/ui/ClickOrFocusOutside.vue'

export default {
  components: {
    PeriodSelect,
    OrderTypeSelect,
    StatusSelect,
    ClickOrFocusOutside,
    Button,
    FilterIcon,
  },
  props: {
    filters: { type: Object, default: null },
  },
  data() {
    return {
      open: false,
      error: false,
      previousFilter: null,
      currentFilter: cloneDeep(this.filters) || {},
    }
  },
  computed: {
    disabled() {
      return this.error
    },
  },
  methods: {
    applyFilters() {
      this.previousFilter = null
      this.open = false
      this.updateFilters()
    },

    async openFilters() {
      this.open = !this.open
      await this.$nextTick()
      this.previousFilter = cloneDeep(this.currentFilter)
    },

    dismissFiltersChange() {
      if (this.previousFilter) {
        this.currentFilter = cloneDeep(this.previousFilter)
      }

      this.open = false
      this.updateFilters()
    },

    updateFilters() {
      const selectedStatus = new Set(this.currentFilter.selectedStatus)
      selectedStatus.delete('all')

      this.$emit('update:filters', {
        ...this.currentFilter,
        selectedStatus,
      })
    },

    reset() {
      if (this.error) {
        this.currentFilter = {}
      }

      this.error = false
    },

    handleError(error) {
      this.error = error
    },
  },
}
</script>

<style scoped lang="scss">
.popper {
  min-width: auto;
  width: calc(100vw - 2rem);
}

@media (min-width: 896px) {
  .popper {
    min-width: 62rem;
    width: auto;
  }

  .select {
    margin-right: 2rem;
  }

  .filters {
    flex-direction: row;
  }
}
</style>
