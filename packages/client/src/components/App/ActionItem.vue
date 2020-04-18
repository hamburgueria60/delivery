<template>
  <list-item class="flex items-center pa3" @click.native="handleActionClick" @keydown.enter.native="handleActionClick">
    <avatar
      :size="24"
      class="relative mr2 white"
      :class="{
        [color]: !notification.read && color,
        'bg-moon-gray': notification.read,
      }"
    >
      <calling-icon :size="16" />
      <span v-if="!notification.read" class="unread br-100 absolute bg-red b--white ba bw1 bottom-0 right-0" />
    </avatar>

    <div class="flex-1 flex">
      <div class="f6">
        <div>
          <div class="mb1 f7 gray">{{ label }}</div>
          <formatted-phone-number :value="notification.phoneNumber" />
        </div>
      </div>
      <div class="ml-auto pl3 f7 gray">
        <formatted-relative :value="notification.createdAt" :options="{ style: 'short' }" />
      </div>
    </div>
  </list-item>
</template>

<script>
import CallingIcon from 'vue-material-design-icons/Phone.vue'
import { mapGetters, mapState } from 'vuex'

import FormattedPhoneNumber from '@/components/intl/FormattedPhoneNumber.vue'
import FormattedRelative from '@/components/intl/FormattedRelative.vue'
import Avatar from '@/components/ui/Avatar.vue'
import ListItem from '@/components/ui/ListItem.vue'
import { STEPS } from '@/constants'
import EventBus from '@/events/DraftConfirmEventBus'
import Status from '@/types/Status'
import { mapGetterSetter } from '@/utils/mapGetterSetter'

export default {
  components: {
    FormattedPhoneNumber,
    FormattedRelative,
    ListItem,
    CallingIcon,
    Avatar,
  },
  directives: {},
  props: {
    color: { type: String, default: 'bg-moon-gray' },
    label: { type: String, default: '' },
    notification: { type: Object, default: null },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('CreateOrder', ['boldSteps', 'dirty', 'status']),
    ...mapGetters('CreateOrder', []),
    ...mapGetterSetter('CreateOrder', {
      isDraftConfirmOpen: 'SET_IS_DRAFT_CONFIRM_OPEN',
    }),
    isCreatingOrder() {
      return this.$route.name === 'create-order'
    },
    isEditingOrder() {
      return this.$route.name === 'edit-order'
    },
    isCreatingOrEditingOrder() {
      return this.isCreatingOrder || this.isEditingOrder
    },
  },
  methods: {
    async handleActionClick() {
      const canProceedToCreateOrder = await this.isDraftCreated()
      if (!canProceedToCreateOrder) return
      await this.createNewOrder()
    },
    async isDraftCreated() {
      let canProceedToSetPhone = true

      const isCreatingOrEditingDraftOrder =
        this.isCreatingOrEditingOrder && (this.dirty || this.status === Status.Draft)

      if (isCreatingOrEditingDraftOrder) {
        this.isDraftConfirmOpen = true
        canProceedToSetPhone = await EventBus.onceCofirmOrCancel()
      }

      return canProceedToSetPhone
    },
    async createNewOrder() {
      const {
        notification,
        notification: { phoneNumber },
      } = this

      this.$storeTyped.commit('CreateOrder/RESET')
      this.$storeTyped.commit('CreateOrder/SET_NEW_ORDER', true)

      if (!this.isCreatingOrder) {
        await this.$router.replace({ name: 'create-order' })
        await this.$nextTick()
      }

      this.$storeTyped.commit('CreateOrder/SET_PHONE', phoneNumber)
      this.$storeTyped.commit('Notifications/READ_NOTIFICATION', notification)
      this.$storeTyped.commit('CreateOrder/SET_BOLD_STEP', STEPS.LOCATION.id)
      this.$storeTyped.commit('CreateOrder/SET_TYPE', 'delivery')
    },
  },
}
</script>

<style scoped>
.unread {
  height: 8px;
  width: 8px;
}
</style>
