<template>
  <div class="w-100">
    <!-- Tipo de pedido -->
    <div class="flex flex-column ph1">
      <div class="dib ttu tracked f7 gray">Tipo de pedido*</div>
      <div>
        <md-radio v-model="type" value="delivery">Entrega</md-radio>
        <md-radio v-model="type" value="restaurant">Restaurante</md-radio>
      </div>
    </div>

    <div v-if="type === 'delivery'">
      <div class="cards bs1 nowrap flex flex-column dt-l h1-l collapse">
        <!-- Telefone -->
        <div class="dtc pa1 w-100 w-25-l ma1-l">
          <title-card class="h-100" header="Telefone*">
            <phone-input placeholder="Digite o telefone" :value.sync="phone" />
          </title-card>
        </div>

        <!-- Endereço -->
        <div class="dtc pa1 w-100 w-50-l ma1-l">
          <address-card class="h-100" />
        </div>

        <!-- Taxa de entrega -->
        <div class="dtc pa1 w-100 w-25-l ma1-l">
          <currency-input-card
            class="h-100"
            :class="{ 'b--red': warning }"
            header="Taxa de entrega"
            :negative="false"
            :value.sync="deliveryFee"
            action-tooltip="Editar taxa de entrega"
          >
            <div :class="{ dn: !warning }" class="red f6">
              Deve ser maior que zero
            </div>

            <div v-if="address && !warning" class="f6 light-silver">
              {{ address.location }}
            </div>
          </currency-input-card>
        </div>
      </div>
    </div>

    <div v-if="type === 'restaurant'" class="flex nowrap pb1">
      <!-- Mesa -->
      <div class="table mr-auto ph1 flex-3 flex-shrink-0">
        <title-card header="Mesa">
          <Input v-model="table" placeholder="Digite o número da mesa" />
        </title-card>
      </div>
    </div>

    <required-field class="pa1" />

    <!-- Ações -->
    <step-actions class="ma1" :done="isLocationStepDone" @next="GO_STEP(2)" @previous="GO_STEP(0)" />
  </div>
</template>

<script>
import { isNil } from 'lodash'
import { mapGetters, mapMutations } from 'vuex'

import AddressCard from '@/components/CreateOrder/AddressCard.vue'
import PhoneInput from '@/components/CreateOrder/PhoneInput.vue'
import RequiredField from '@/components/CreateOrder/RequiredField.vue'
import StepActions from '@/components/CreateOrder/StepActions.vue'
import CurrencyInputCard from '@/components/ui/CurrencyInputCard.vue'
import Input from '@/components/ui/Input.vue'
import TitleCard from '@/components/ui/TitleCard.vue'
import { mapGetterSetter } from '@/utils/mapGetterSetter'

export default {
  components: {
    StepActions,
    Input,
    PhoneInput,
    AddressCard,
    CurrencyInputCard,
    TitleCard,
    RequiredField,
  },
  computed: {
    ...mapGetters('CreateOrder', ['isLocationStepDone']),
    ...mapGetterSetter('CreateOrder', {
      table: 'SET_TABLE',
      type: 'SET_TYPE',
      address: 'SET_ADDRESS',
      deliveryFee: 'SET_DELIVERY_FEE',
      phone: 'SET_PHONE',
    }),
    warning() {
      return isNil(this.deliveryFee) || this.deliveryFee <= 0
    },
  },
  methods: {
    ...mapMutations('CreateOrder', ['GO_STEP']),
  },
}
</script>

<style scoped></style>
