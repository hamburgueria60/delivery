<template>
  <div class="mt3 f6 light-silver">
    <div class="bt b--moon-gray nowrap">
      <div v-if="totalAmount !== subtotalAmount" class="flex pt3">
        <div class="flex-1">
          Subtotal
        </div>
        <div>
          <formatted-currency :value="subtotalAmount" />
        </div>
      </div>

      <div v-if="deliveryFee" class="flex pt3">
        <div class="flex-1">Taxa de entrega</div>
        <div>
          <formatted-currency :value="deliveryFee" />
        </div>
      </div>

      <div v-if="additionOrDiscount < 0" class="flex pt3">
        <div class="flex-1">Desconto</div>
        <div>
          <formatted-currency :value="additionOrDiscount" />
        </div>
      </div>

      <div v-if="additionOrDiscount > 0" class="flex pt3">
        <div class="flex-1">Acréscimo</div>
        <div>
          <formatted-currency :value="additionOrDiscount" />
        </div>
      </div>

      <div class="flex pt3 b">
        <div class="flex-1">Total</div>
        <div>
          <formatted-currency :value="totalAmount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import FormattedCurrency from '@/components/intl/FormattedCurrency.vue'

export default {
  components: {
    FormattedCurrency,
  },
  computed: {
    ...mapState('CreateOrder', ['deliveryFee']),
    ...mapGetters('CreateOrder', {
      additionOrDiscount: 'totalAdditionOrDiscount',
    }),
    ...mapGetters('CreateOrder', ['totalAmount', 'subtotalAmount']),
  },
}
</script>

<style></style>
