<template>
  <div class="mb4">
    <div class="mh1 f6 fw5 silver pl1 pb1">
      Carregando...
    </div>

    <ul class="list" direction="horizontal">
      <li v-for="order in orders" :key="order" class="fl w-100 w-50-m w-third-l">
        <Card class="flex flex-1 item pa3 pb2 ma1">
          <div class="flex-1">
            <loading-placeholder class="f7 mb1 w-30" />
            <loading-placeholder class="f5 mb1 w-80" />
            <loading-placeholder class="f5 w-40" />
          </div>

          <avatar>
            <loading-placeholder class="f7 w-100 h-100 br-100 flex-shrink-0" />
          </avatar>
        </Card>
      </li>
    </ul>
  </div>
</template>

<script>
import { range } from 'lodash'

import Avatar from '@/components/ui/Avatar.vue'
import Card from '@/components/ui/Card.vue'
import LoadingPlaceholder from '@/components/ui/LoadingPlaceholder.vue'

export default {
  components: {
    Avatar,
    Card,
    LoadingPlaceholder,
  },
  data() {
    return { orders: range(0, 12) }
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: -0.25rem;
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
</style>
