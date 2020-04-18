<template>
  <ul class="items-step flex-auto ph1">
    <!-- Itens -->
    <select-input-card
      v-model="query"
      class="input-card"
      type="multi"
      header="Itens"
      active-placeholder="Digite para escolher um item do cardápio"
      :options="{ text: 'name', key: 'id' }"
      :items="items"
      :empty="!groupedSelectedItems.length"
      :loading="$apollo.queries.allItems.loading"
      @select="addItem"
    >
      <template #loading>
        <loading v-if="$apollo.queries.allItems.loading" :size="20" />
      </template>

      <div v-if="groupedSelectedItems.length > 0" ref="items" class="pv2">
        <list-item v-for="item in groupedSelectedItems" :key="item.id" navigable class="item pa3 lh-copy">
          <div class="flex items-center">
            <div class="flex">
              ({{ item.quantity }}) {{ item.name }} —
              <span :aria-label="currencyToWords(item.total)">
                <formatted-currency :value="item.total" />
              </span>

              <div v-if="item.additionOrDiscount" class="ml2" :class="[getAmountColor(item.additionOrDiscount)]">
                <formatted-currency :value="item.additionOrDiscount" />
              </div>
            </div>

            <div class="dn flex-l items-center ml3">
              <items-actions :item="item" />
            </div>
          </div>

          <div v-if="item.description" class="f6 ttc silver">
            {{ item.description }}
          </div>

          <items-actions class="dn-l pt2" :item="item" />
        </list-item>
      </div>
    </select-input-card>

    <!-- Ações -->
    <step-actions :done="isItemsStepDone" @next="goStep(1)" />

    <try-again-snackbar :md-active.sync="displayTryAgainSnackbar" @click="tryAgain()" />
  </ul>
</template>

<script>
import { toLower } from 'lodash'
import { mapGetters, mapMutations } from 'vuex'

import ItemsActions from '@/components/CreateOrder/ItemsActions.vue'
import StepActions from '@/components/CreateOrder/StepActions.vue'
import TryAgainSnackbar from '@/components/CreateOrder/TryAgainSnackbar.vue'
import FormattedCurrency from '@/components/intl/FormattedCurrency.vue'
import ListItem from '@/components/ui/ListItem.vue'
import Loading from '@/components/ui/Loading.vue'
import SelectInputCard from '@/components/ui/SelectInputCard.vue'
import { GET_ITEMS } from '@/gqls'
import currencyToWords from '@/utils/currencyToWords'

import { mapGetterSetter } from '../../utils/mapGetterSetter'

export default {
  components: {
    ItemsActions,
    StepActions,
    TryAgainSnackbar,
    FormattedCurrency,
    ListItem,
    SelectInputCard,
    Loading,
  },

  props: {
    step: { type: Number, default: null },
  },

  data() {
    return {
      allItems: [],
      displayTryAgainSnackbar: false,
    }
  },

  computed: {
    ...mapGetters('CreateOrder', ['groupedSelectedItems', 'isItemsStepDone']),
    ...mapGetterSetter('CreateOrder', { query: 'SET_QUERY' }),

    items() {
      if (this.query.length >= 3) {
        return this.allItems.filter(item => {
          return toLower(item.name).startsWith(toLower(this.query))
        })
      }
      return []
    },
  },

  methods: {
    currencyToWords,

    ...mapMutations('CreateOrder', { goStep: 'GO_STEP', addItem: 'ADD_ITEM' }),

    getAmountColor(amount) {
      if (amount > 0) return 'red'
      if (amount < 0) return 'green'
      return ''
    },

    async tryAgain() {
      this.displayTryAgainSnackbar = false
      try {
        this.$apollo.queries.items.skip = false
        await this.$apollo.queries.items.refetch()
      } catch (e) {
        this.displayTryAgainSnackbar = true
      }
    },
  },

  apollo: {
    allItems: {
      debounce: 300,
      query: GET_ITEMS,
      update: r => r.items,
      error() {
        this.displayTryAgainSnackbar = true
      },
    },
  },
}
</script>

<style scoped lang="scss">
ul {
  padding-left: 0;
}

.input-card {
  min-height: 84px;
}
</style>
