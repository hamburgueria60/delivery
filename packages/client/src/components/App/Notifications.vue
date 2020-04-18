<template>
  <v-popover v-focus-outside="handleFocusOutside" :open.sync="open" placement="top-end">
    <div
      v-tooltip="{
        content: 'Notificações',
        ...(open && { show: !open }),
      }"
      class="dim pointer"
      data-target
      tabindex="0"
      @click="open = true"
      @keydown.enter="open = true"
    >
      <notification-icon :title="''" :size="16" class="silver" :class="{ 'blue ring': unread }" />
    </div>

    <template #popover>
      <card class="mt1 min-w5 shadow-4">
        <div class="ph3 pt3 mb2 f7 gray">Notificações</div>

        <div v-if="notifications.length === 0" class="f5 tc moon-gray ma4">
          Todas as notificações foram lidas
        </div>

        <navigation focus-on-first-grandchild>
          <div v-for="notification in notifications" :key="notification.id">
            <action-item
              v-if="notification.type === 'WHATSAPP'"
              color="bg-green"
              label="Pedido do Whatsapp"
              :notification="notification"
              @click.native="open = false"
              @keydown.enter.native="open = false"
            />

            <action-item
              v-if="notification.type === 'CALL'"
              color="bg-blue"
              label="Ligação recebida"
              :notification="notification"
              @click.native="open = false"
              @keydown.enter.native="open = false"
            />
          </div>
        </navigation>
      </card>
    </template>
  </v-popover>
</template>

<script>
import { VPopover } from 'v-tooltip'
import NotificationIcon from 'vue-material-design-icons/Bell.vue'
import { mapGetters } from 'vuex'

import ActionItem from '@/components/App/ActionItem.vue'
import Card from '@/components/ui/Card.vue'
import Navigation from '@/components/ui/LegacyNavigation.vue'
import FocusOutsideDirective from '@/directives/FocusOutsideDirective'

import { GET_RECEIVED_CALLS, SUBSCRIBE_TO_CALL_RECEIVED } from '../../gqls'

export default {
  components: {
    ActionItem,
    Navigation,
    Card,
    VPopover,
    NotificationIcon,
  },
  directives: {
    FocusOutside: FocusOutsideDirective,
  },
  data() {
    return {
      open: false,
      phoneNumber: '',
    }
  },
  computed: {
    ...mapGetters('Notifications', ['notifications']),
    unread() {
      return this.notifications.some(notification => !notification.read)
    },
  },
  methods: {
    handleFocusOutside() {
      this.open = false
    },
  },
  apollo: {
    receivedCalls() {
      return {
        query: GET_RECEIVED_CALLS,
        fetchPolicy: 'network-only',
        result({ data }) {
          this.$store.commit('Notifications/ADD_NOTIFICATIONS', data.receivedCalls)
        },
      }
    },
    $subscribe: {
      callReceived: {
        query: SUBSCRIBE_TO_CALL_RECEIVED,
        result({ data }) {
          this.$store.commit('Notifications/ADD_NOTIFICATION', data.callReceived)
        },
      },
    },
  },
}
</script>

<!-- eslint-disable prettier/prettier -->
<style lang="scss" scoped> 
.ring {
  animation: ring 4s .7s ease-in-out infinite;
  transform-origin: 50% 4px;
}

@keyframes ring {
  0% { transform: rotate(0); }
  1% { transform: rotate(30deg); }
  3% { transform: rotate(-28deg); }
  5% { transform: rotate(34deg); }
  7% { transform: rotate(-32deg); }
  9% { transform: rotate(30deg); }
  11% { transform: rotate(-28deg); }
  13% { transform: rotate(26deg); }
  15% { transform: rotate(-24deg); }
  17% { transform: rotate(22deg); }
  19% { transform: rotate(-20deg); }
  21% { transform: rotate(18deg); }
  23% { transform: rotate(-16deg); }
  25% { transform: rotate(14deg); }
  27% { transform: rotate(-12deg); }
  29% { transform: rotate(10deg); }
  31% { transform: rotate(-8deg); }
  33% { transform: rotate(6deg); }
  35% { transform: rotate(-4deg); }
  37% { transform: rotate(2deg); }
  39% { transform: rotate(-1deg); }
  41% { transform: rotate(1deg); }
  43% { transform: rotate(0); }
  100% { transform: rotate(0); }
}
</style>
<!-- eslint-disable prettier/prettier -->
