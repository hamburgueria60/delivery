import { Notification } from '@/types/Notification'
import { consumeURLParameter } from '@/utils/url'

import initialState from './initialState'
import mockState from './mockState'
import { NotificationsState as State } from './types'

export * from './types'

export default {
  namespaced: true,
  modules: {},
  actions: {},
  state: consumeURLParameter('m', { keep: true }) ? mockState : initialState,
  getters: {
    notifications(state: State): Notification[] {
      return Array.from(state.notifications.values())
    },
  },
  mutations: {
    ADD_NOTIFICATIONS(state: State, notifications: Map<string, Notification>): void {
      notifications?.forEach((notification): void => {
        if (notification.type) {
          state.notifications = new Map(state.notifications.set(notification.id, notification))
        }
      })
    },
    ADD_NOTIFICATION(state: State, notification: Notification): void {
      if (notification.type) {
        state.notifications = new Map(state.notifications.set(notification.id, notification))
      }
    },
    READ_NOTIFICATION(state: State, notification: Notification): void {
      const unreadNotification = state.notifications.get(notification.id)
      if (unreadNotification) unreadNotification.read = true
    },
  },
}
