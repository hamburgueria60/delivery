import setter from '../setter'

export * from './types'

export default {
  namespaced: true,
  modules: {},
  actions: {},
  state: {
    selectedOrder: null,
  },
  getters: {},
  mutations: {
    ...setter('SET_SELECTED_ORDER', 'selectedOrder'),
  },
}
