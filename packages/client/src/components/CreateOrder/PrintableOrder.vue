<template>
  <md-card ref="body" class="order width relative pa3 flex flex-column">
    <div class="flex flex-column items-center f7 pb0">
      <div>
        {{ attendant.name }}
      </div>

      <div class="total-amount tc f3 mt2">
        <formatted-currency :value="totalAmount" />
      </div>
    </div>

    <div class="flex flex-1 f6">
      <div class="flex-1 flex flex-column w-100 pt0">
        <div
          v-if="payment.type === 'money' && payment.service === 'prepaid'"
          class="flex justify-between pt3 absolute top-0 left-0 w-100"
        >
          <div class="ml3">
            <div class="ttu f7 tracked pb1">Valor pago</div>
            <formatted-currency :value="payment.value" />
          </div>

          <div class="mr3 tr">
            <div class="ttu f7 tracked pb1">Troco</div>
            <formatted-currency :value="change" />
          </div>
        </div>

        <div v-if="type === 'delivery'" class="mb2">
          <div class="ttu f7 tracked pb1">Endereço</div>

          <div v-if="address">
            {{ address.streetName }}, {{ address.number }} -
            {{ address.location }}
            <div>
              {{ address.complement }}
            </div>
          </div>
        </div>

        <div v-if="type === 'restaurant'" class="mb2">
          <div class="ttu f7 tracked pb1">Mesa</div>
          <div>{{ table }}</div>
        </div>

        <div class="items mb2">
          <div v-for="item in groupedSelectedItems" :key="item.id" class="item flex mt2 bb b--moon-gray">
            <div class="flex flex-1 pb2">
              <div>{{ item.quantity }}&times;</div>

              <div class="ml2">
                <div>{{ item.name }}</div>
                <div>{{ item.description }}</div>
              </div>
            </div>

            <div class="b ml2 nowrap">
              <formatted-currency :value="item.total" />
            </div>
          </div>

          <div v-for="entry in entries" :key="entry.label" class="item flex mt2 bb b--moon-gray">
            <div class="flex flex-1 pb2">
              <div>1&times;</div>
              <div class="ml2">{{ entry.label }}</div>
            </div>

            <div class="b ml2 nowrap">
              <formatted-currency :value="entry.value" />
            </div>
          </div>
        </div>

        <div class="mt-auto">
          <div v-if="note" class="f7 ttu tc pa2 ma2 bg-light-gray">
            {{ note }}
          </div>

          <div class="tc ttu f7">
            <div v-if="payment.service === 'postpaid'">
              Pagamento após o consumo do pedido
            </div>

            <span class="tracked-mega b">- {{ type }} -</span>

            <div v-if="payment.service === 'prepaid'">{{ paymentType }}</div>

            <div v-if="shortid && createdAt" class="f7 pb0">
              - <span class="id b">{{ shortid }}</span> -
              <formatted-date-time :value="createdAt" />
              -
            </div>
          </div>
        </div>
      </div>
    </div>
  </md-card>
</template>

<script>
import FormattedCurrency from '@/components/intl/FormattedCurrency.vue'
import FormattedDateTime from '@/components/intl/FormattedDateTime.vue'
import MdCard from '@/components/ui/Card.vue'
import * as getters from '@/stores/create-order/getters'
import resolveGetter from '@/utils/resolveGetter'

export default {
  components: {
    FormattedDateTime,
    FormattedCurrency,
    MdCard,
  },
  props: {
    totalAmount: { type: Number, required: true },
    payment: { type: Object, required: true },
    items: { type: Array, required: true },
    type: { type: String, required: true },
    deliveryFee: { type: Number, default: null },
    additionOrDiscount: { type: Number, default: null },
    address: { type: Object, default: null },
    table: { type: String, default: '' },
    shortid: { type: String, default: '' },
    createdAt: { type: String, default: '' },
    note: { type: String, default: '' },
    attendant: { type: Object, required: true },
  },
  computed: {
    groupedSelectedItems() {
      return resolveGetter(getters, 'groupedSelectedItems', {
        selectedItems: this.items,
      })
    },
    totalAdditionOrDiscount() {
      return resolveGetter(getters, 'totalAdditionOrDiscount', {
        selectedItems: this.items,
        additionOrDiscount: this.additionOrDiscount,
      })
    },
    change() {
      return resolveGetter(getters, 'change', this)
    },
    paymentType() {
      return resolveGetter(getters, 'paymentType', this)
    },
    entries() {
      const delivery = this.deliveryFee
      const value = this.totalAdditionOrDiscount
      const addition = value > 0
      const discount = value < 0

      return [
        ...(delivery ? [{ label: 'Taxa de Entrega', value: delivery }] : []),
        ...(addition ? [{ label: 'Acréscimo', value }] : []),
        ...(discount ? [{ label: 'Desconto', value }] : []),
      ]
    },
  },
}
</script>

<style scoped>
.width {
  width: 397px;
}
.order {
  height: 461px;
}
.item {
  border-bottom-style: dashed;
}
</style>
