<template>
  <router-view />
</template>

<script>
import { mapMutations } from 'vuex'

import { GET_ME } from '@/gqls'

export default {
  data() {
    return {
      me: null,
    }
  },
  methods: {
    ...mapMutations('User', { setCurrentUser: 'SET_CURRENT_USER' }),
  },
  apollo: {
    me: {
      query: GET_ME,
      result({ data }) {
        this.setCurrentUser(data.me)
      },
    },
  },
}
</script>

<style></style>
