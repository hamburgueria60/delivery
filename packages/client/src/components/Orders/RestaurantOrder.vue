<template>
  <order-item :order="order">
    <template #body>
      <span v-if="order.table">Mesa {{ order.table }}</span>
      <span v-if="!order.table">-</span>
    </template>

    <template #avatar>
      <avatar class="purple bg-washed-purple">
        <restaurant-icon :size="20" />
      </avatar>
    </template>
  </order-item>
</template>

<script>
import RestaurantIcon from 'vue-material-design-icons/Home.vue'

import OrderItem from '@/components/Orders/OrderItem.vue'
import Avatar from '@/components/ui/Avatar.vue'

export default {
  components: {
    OrderItem,
    Avatar,
    RestaurantIcon,
  },
  props: {
    order: { type: Object, default: null },
  },
}
</script>
