<template>
  <card
    class="order pa3 pb2 flex flex-1 ma1 silver pointer hover-b--current"
    :class="{ 'fw5 shadow-1': recent }"
    :style="style.recent"
  >
    <div class="min-w0">
      <slot name="caption">
        <div class="gray f7 mb1">
          <formatted-relative :value="order.createdAt" @change="onChangeRelativeTime" />
        </div>
      </slot>

      <div class="f5 mb1 dark-gray">
        <slot name="body">-</slot>
      </div>

      <slot name="footer">
        <order-status :status="order.status" />
      </slot>
    </div>

    <div class="ml-auto flex-shrink-0">
      <div class="ml3 h-100">
        <slot name="avatar">
          <avatar class="gray bg-near-white">
            <unknown-icon :size="20" />
          </avatar>
        </slot>
      </div>
    </div>
  </card>
</template>

<script>
import differenceInMinutes from 'date-fns/differenceInMinutes'
import UnknownIcon from 'vue-material-design-icons/Help.vue'

import FormattedRelative from '@/components/intl/FormattedRelative.vue'
import OrderStatus from '@/components/Orders/OrderStatus.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Card from '@/components/ui/Card.vue'

const DIFF_IN_MINUTES_FOR_RECENT_ORDER = 5

export default {
  components: {
    Avatar,
    UnknownIcon,
    Card,
    FormattedRelative,
    OrderStatus,
  },
  props: {
    order: { type: Object, default: null },
  },
  data() {
    return {
      recent: false,
      style: {
        recent: {
          transition: 'box-shadow 0.5s ease-out',
        },
      },
    }
  },
  methods: {
    onChangeRelativeTime() {
      const createdAt = new Date(this.order?.createdAt)
      this.recent = differenceInMinutes(Date.now(), createdAt) <= DIFF_IN_MINUTES_FOR_RECENT_ORDER
    },
  },
}
</script>

<style></style>
