<template>
  <div class="container flex flex-column justify-center mb5">
    <loading-state v-if="loading" />
    <error-state v-if="error" :error="error" @try-again="handleTryAgain" />
    <empty-state v-if="!error && !loading && isEmpty" />

    <v-fragment v-if="!loading">
      <div v-for="({ key, label, group, select }, i) in groups" :key="key">
        <div v-if="group.length > 0" :class="{ mt4: i > 0 }">
          <div class="mh1 f6 fw5 silver pl1 pb1">{{ label }} ({{ group.length }})</div>

          <navigation v-slot="{ tabindex }" class="list" direction="horizontal">
            <navigation-item
              v-for="(order, j) in group"
              :key="order.id"
              component="li"
              class="navigation-item fl w-100 w-50-m w-third-l"
              :tabindex="tabindex(j)"
              @select="select(order)"
            >
              <order-item v-if="!order.type" :order="order" />
              <delivery-order v-if="order.type === 'delivery'" :order="order" />
              <restaurant-order v-if="order.type === 'restaurant'" :order="order" />
            </navigation-item>
          </navigation>
        </div>
      </div>
    </v-fragment>
  </div>
</template>

<script>
import { map } from 'lodash'

import DeliveryOrder from '@/components/Orders/DeliveryOrder.vue'
import EmptyState from '@/components/Orders/EmptyState.vue'
import ErrorState from '@/components/Orders/ErrorState.vue'
import LoadingState from '@/components/Orders/LoadingState.vue'
import OrderItem from '@/components/Orders/OrderItem.vue'
import RestaurantOrder from '@/components/Orders/RestaurantOrder.vue'
import Navigation from '@/components/ui/Navigation.vue'
import NavigationItem from '@/components/ui/Selectable.vue'
import VFragment from '@/components/ui/VFragment'
import { GET_ORDERS } from '@/gqls'
import Address from '@/types/Address'
import { mapGetterSetter } from '@/utils/mapGetterSetter'

const Component = {
  components: {
    VFragment,
    EmptyState,
    ErrorState,
    LoadingState,
    OrderItem,
    RestaurantOrder,
    DeliveryOrder,
    NavigationItem,
    Navigation,
  },
  props: {
    filters: { type: Object, default: null },
  },
  data() {
    return {
      error: null,
      orders: {
        allOrdersExceptDraft: [],
        draftOrders: [],
      },
    }
  },
  computed: {
    ...mapGetterSetter('Orders', {
      selectedOrder: 'SET_SELECTED_ORDER',
    }),
    isEmpty() {
      return this.orders.draftOrders.length === 0 && this.orders.allOrdersExceptDraft.length === 0
    },
    groups() {
      const { draftOrders, allOrdersExceptDraft } = this.orders

      return [
        draftOrders.length > 0 && {
          key: 'draftOrders',
          label: 'Rascunhos',
          group: draftOrders,
          select: this.editDraftOrder.bind(this),
        },
        allOrdersExceptDraft.length > 0 && {
          key: 'allOrdersExceptDraft',
          label: 'Ativos',
          group: allOrdersExceptDraft,
          select: this.previewOrder.bind(this),
        },
      ].filter(Boolean)
    },
    loading() {
      return this.$apollo.loading
    },
    selectedStatus() {
      return Array.from(this.filters.selectedStatus)
    },
  },
  apollo: {
    orders() {
      return {
        fetchPolicy: 'network-only',
        query() {
          this.error = null
          return GET_ORDERS
        },
        variables() {
          return { status: this.selectedStatus }
        },
        update(result) {
          return {
            draftOrders: this.parseOrders(result.draftOrders),
            allOrdersExceptDraft: this.parseOrders(result.allOrdersExceptDraft),
          }
        },
        error(error) {
          this.error = this.buildObjectToErrorState(error)
        },
      }
    },
  },
  methods: {
    handleTryAgain() {
      try {
        this.error = null
        this.$apollo.queries.orders.refetch()
      } catch (e) {
        // ignored
      }
    },
    editDraftOrder(order) {
      this.$router.push({ name: 'edit-order', params: { id: order.id } })
      this.$storeTyped.dispatch('CreateOrder/editDraftOrder', order)
    },
    previewOrder(order) {
      this.selectedOrder = order
      this.$router.push({
        name: 'preview-order',
        params: { id: order.shortid },
      })
    },
    parseOrders(orders) {
      return map(orders, order => {
        if (!order.type || order.type === 'delivery') {
          return { ...order, address: new Address(order.address) }
        }
        return order
      })
    },
    buildObjectToErrorState(error) {
      return { instance: error }
    },
  },
}

export default Component
</script>

<style lang="scss" scoped>
.container {
  margin-top: -0.25rem;
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}

.navigation-item.focus-visible .order {
  background: var(--light-gray);
  border-color: var(--silver);
}
</style>
