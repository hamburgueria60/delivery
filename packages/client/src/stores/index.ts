import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import NotificationListener from '@/events/NotificationListener'

import CreateOrder from './create-order'
import Notifications from './notifications'
import Orders from './orders'
import { RootState } from './types'
import User from './user'

export * from './types'

Vue.use(Vuex)

const store = new Vuex.Store<RootState>({
  modules: {
    Orders,
    CreateOrder,
    Notifications,
    User,
  },
  plugins: [NotificationListener],
})

export default store

declare module 'vue/types/vue' {
  interface Vue {
    $storeTyped: Store<RootState>
  }
}

Object.defineProperty(Vue.prototype, '$storeTyped', {
  get: function get(this: Vue): Store<RootState> {
    return this.$store
  },
})
