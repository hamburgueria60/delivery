<template>
  <order-item :order="order">
    <template #body>
      <Address type="one-line" :address="order.address" />
    </template>

    <template #avatar>
      <avatar class="green bg-washed-green">
        <delivery-icon :size="20" />
      </avatar>
    </template>
  </order-item>
</template>

<script>
import DeliveryIcon from 'vue-material-design-icons/Truck.vue'

import OrderItem from '@/components/Orders/OrderItem.vue'
import Address from '@/components/ui/Address.vue'
import Avatar from '@/components/ui/Avatar.vue'

export default {
  components: {
    OrderItem,
    Avatar,
    Address,
    DeliveryIcon,
  },
  props: {
    order: { type: Object, default: null },
  },
}
</script>
