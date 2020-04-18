<template>
  <div>
    <div class="bg-white flex flex-column">
      <div class="mw8 center w-100 z-2">
        <div class="ma3">
          <div class="flex justify-between">
            <filters-button :filters.sync="filters" />
            <Button filled @click.native="goToNewOrder">Novo pedido</Button>
          </div>
        </div>
      </div>
    </div>

    <div class="mw8 center pa3">
      <orders-list :filters="filters" />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import FiltersButton from '@/components/Orders/FiltersButton.vue'
import OrdersList from '@/components/Orders/OrdersList.vue'
import Button from '@/components/ui/Button.vue'
import Status from '@/types/Status'

export default {
  name: 'Orders',
  components: {
    FiltersButton,
    OrdersList,
    Button,
  },
  data() {
    return {
      filters: {
        selectedPeriod: 'today',
        selectedOrderType: 'delivery',
        selectedStatus: new Set(['all', Status.Draft, Status.Received, Status.Ready, Status.Done]),
      },
    }
  },
  methods: {
    ...mapMutations('CreateOrder', ['SET_NEW_ORDER']),
    goToNewOrder() {
      this.$router.push({ name: 'create-order' })
      this.SET_NEW_ORDER(true)
    },
  },
}
</script>
