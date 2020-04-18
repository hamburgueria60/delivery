<template>
  <div>
    <create-address v-if="phone" :open.sync="isOpenCreateAddressDialog" @update:address="setAddress" />

    <!-- Adicionar endereço -->
    <action
      v-if="shouldDisplayCreateButton"
      ref="target"
      aria-label="Adicionar endereço"
      data-target
      @select="handleCreateAddressClick()"
    >
      <home-icon :title="''" :size="16" class="icon" />
    </action>

    <v-popover
      class="popover"
      v-tooltip="'Alterar ou adicionar endereço'"
      v-if="shouldDisplayEditButton"
      placement="bottom-end"
      :open.sync="isAddressesMenuOpen"
      :container="false"
    >
      <!-- Editar endereço -->
      <action>
        <pencil-icon :title="''" :size="16" class="icon" />
      </action>

      <!-- Menu de endereços -->
      <template #popover>
        <md-card class="min-w5 mt2">
          <navigation v-slot="{ tabindex }">
            <list-item
              v-for="(otherAddress, index) in otherAddresses"
              :key="otherAddress.id"
              :tabindex="tabindex(index)"
              @select="setAddress(otherAddress)"
            >
              <div class="pv3 pl5 pr4 non-selectable">
                <div>
                  {{ otherAddress.streetName }},
                  {{ otherAddress.number }}
                </div>
                <div class="light-silver f6">
                  <div>
                    {{ otherAddress.complement }}
                  </div>
                  <div>
                    {{ otherAddress.location }}
                  </div>
                </div>
              </div>
            </list-item>

            <!-- Adicionar endereço -->
            <list-item @select="handleCreateAddressClick()" tabindex="-1">
              <div class="flex items-center pv3 pl5 pr4 non-selectable relative bt b--moon-gray">
                <home-icon :title="''" :size="24" class="icon absolute left-1 gray" />
                Novo endereço
              </div>
            </list-item>
          </navigation>
        </md-card>
      </template>
    </v-popover>
  </div>
</template>

<script>
import { isNil } from 'lodash'
import HomeIcon from 'vue-material-design-icons/HomePlus.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'

import CreateAddress from '@/components/CreateOrder/CreateAddress.vue'
import Action from '@/components/ui/Action.vue'
import ListItem from '@/components/ui/ListItem.vue'
import Navigation from '@/components/ui/Navigation.vue'
import { GET_ADDRESSES } from '@/gqls'
import { getRawPhone } from '@/utils/phone'

export default {
  components: {
    Action,
    HomeIcon,
    PencilIcon,
    Navigation,
    CreateAddress,
    ListItem,
  },
  props: {
    addresses: { type: Array, default: null },
    address: { type: Object, default: null },
    phone: { type: String, required: true },
    loading: { type: Boolean },
  },
  data() {
    return {
      allAddresses: this.addresses,
      isOpenCreateAddressDialog: false,
      isAddressesMenuOpen: false,
    }
  },
  watch: {
    addresses(addresses) {
      this.allAddresses = addresses
    },
  },
  computed: {
    shouldDisplayAnyButton() {
      return !this.$apollo.loading && this.phone
    },
    shouldDisplayCreateButton() {
      return this.shouldDisplayAnyButton && this.otherAddresses.length === 0
    },
    shouldDisplayEditButton() {
      return this.shouldDisplayAnyButton && this.otherAddresses.length > 0
    },
    otherAddresses() {
      const addresses = this.allAddresses || []
      return addresses.filter(address => this.address?.id !== address.id)
    },
  },
  methods: {
    handleCreateAddressClick() {
      this.isOpenCreateAddressDialog = !this.isOpenCreateAddressDialog
      this.isAddressesMenuOpen = false
    },
    setAddress(address) {
      this.$emit('update:address', address)
      this.isAddressesMenuOpen = false
    },
  },
  apollo: {
    addresses() {
      this.$emit('update:loading', true)
      return {
        query: GET_ADDRESSES,
        fetchPolicy: 'network-only',
        variables() {
          return { phone: getRawPhone(this.phone) }
        },
        skip() {
          const proceed = isNil(this.allAddresses) && Boolean(this.phone)
          this.$emit('update:loading', proceed)
          return !proceed
        },
        result({ data: { addresses } }) {
          this.$emit('update:loading', false)
          this.allAddresses = addresses
        },
        error() {
          this.$emit('update:loading', false)
        },
      }
    },
  },
}
</script>

<style scoped>
.popover::v-deep > .tooltip {
  margin-top: 0;
}
</style>
