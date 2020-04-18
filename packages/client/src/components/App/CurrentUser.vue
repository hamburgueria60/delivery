<template>
  <v-popover :open.sync="open" placement="top-end">
    <div class="bl b--moon-gray ml3 pl3 f6 v-mid flex items-center dim pointer non-selectable" tabindex="0">
      <div>
        {{ user ? user.name : 'Carregando...' }}
      </div>
      <icon class="ml1 moon-gray" :title="''" />
    </div>

    <template #popover>
      <card class="min-w5 shadow-4">
        <navigation>
          <list-item tabindex="0" class="pa3 f6" @select="logout">
            Encerrar sessão
          </list-item>
        </navigation>
      </card>
    </template>
  </v-popover>
</template>

<script>
import axios from 'axios'
import { VPopover } from 'v-tooltip'
import Icon from 'vue-material-design-icons/AccountCircle'
import { mapState } from 'vuex'

import Card from '@/components/ui/Card.vue'
import ListItem from '@/components/ui/ListItem.vue'
import Navigation from '@/components/ui/Navigation.vue'

export default {
  components: {
    Icon,
    VPopover,
    Card,
    Navigation,
    ListItem,
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    ...mapState('User', { user: 'current' }),
  },
  methods: {
    async logout() {
      this.open = false
      await axios.get('/auth/logout')
      window.location.href = '/login'
    },
  },
}
</script>

<style></style>
