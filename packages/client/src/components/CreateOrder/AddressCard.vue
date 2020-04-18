<template>
  <title-card header="Endereço">
    <Placeholder v-if="!address && !loading">
      Nenhum endereço selecionado
    </Placeholder>

    <template #icons>
      <div>
        <div class="flex">
          <!-- Abrir Google Maps -->
          <action v-if="address && !loading" aria-label="Abrir Google Maps" class="mr2 gray" @select="openMap">
            <google-maps-icon :title="''" :size="16" class="icon" />
          </action>

          <!-- Editar ou escolher outro endereço -->
          <address-actions
            @update:address="setAddress"
            :address.sync="address"
            :addresses="addresses"
            :phone="phone"
            :loading.sync="isLoadingAddresses"
          />
        </div>

        <loading v-if="loading" :size="20" />
      </div>
    </template>

    <!-- Endereço -->
    <div v-if="address">
      <div class="lh-copy truncate">{{ address.streetName }}, {{ address.number }}</div>
      <div class="f6 light-silver lh-title truncate">
        {{ address.complement }}
      </div>
      <div class="f6 light-silver lh-title flex  truncate">
        <div class="flex-1 truncate w1">
          {{ address.location }}
        </div>

        <div v-if="address.distance" class="ml2 mid-gray">
          <formatted-number :value="address.distance.value" />
          &nbsp;
          <span>{{ address.distance.unit }}</span>
        </div>
      </div>
    </div>
  </title-card>
</template>

<script>
import { head } from 'lodash'
import GoogleMapsIcon from 'vue-material-design-icons/GoogleMaps.vue'
import { mapState } from 'vuex'

import AddressActions from '@/components/CreateOrder/AddressActions.vue'
import FormattedNumber from '@/components/intl/FormattedNumber.vue'
import Action from '@/components/ui/Action.vue'
import Loading from '@/components/ui/Loading.vue'
import Placeholder from '@/components/ui/Placeholder.vue'
import TitleCard from '@/components/ui/TitleCard.vue'
import { NUMBER_WITH_DDD_LENGTH } from '@/constants'
import { GET_ADDRESSES } from '@/gqls'
import { mapGetterSetter } from '@/utils/mapGetterSetter'
import { getRawPhone } from '@/utils/phone'

export default {
  components: {
    AddressActions,
    FormattedNumber,
    TitleCard,
    Placeholder,
    Loading,
    GoogleMapsIcon,
    Action,
  },
  data() {
    return {
      isLoadingAddresses: false,
    }
  },
  computed: {
    ...mapState('CreateOrder', ['phone']),
    ...mapGetterSetter('CreateOrder', {
      address: 'SET_ADDRESS',
      deliveryFee: 'SET_DELIVERY_FEE',
    }),
    loading() {
      return this.isLoadingAddresses || this.$apollo.loading
    },
    googleMapsQuery() {
      return this.address
        ? [this.address.streetName, this.address.number, this.address.location, 'Manaus Amazonas BR']
            .filter(Boolean)
            .join(' ')
            .replace(/\s/g, '+')
        : ''
    },
  },
  watch: {
    phone() {
      if (this.phone.length !== NUMBER_WITH_DDD_LENGTH) {
        this.address = null
        this.addresses = null
      }
    },
  },
  methods: {
    setAddress(address) {
      this.address = address
      this.deliveryFee = address?.deliveryFee
    },
    openMap() {
      window.open(`http://maps.google.com?q=${this.googleMapsQuery}`, '_blank')
    },
  },
  apollo: {
    addresses: {
      query: GET_ADDRESSES,
      variables() {
        return { phone: getRawPhone(this.phone) }
      },
      result({ data: { addresses } }) {
        this.setAddress(head(addresses))
      },
      skip() {
        return !(this.phone && this.phone.length === NUMBER_WITH_DDD_LENGTH && !this.address)
      },
    },
  },
}
</script>

<style></style>
