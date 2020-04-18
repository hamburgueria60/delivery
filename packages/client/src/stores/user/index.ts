import * as mutations from './mutations'

export * from './types'

export default {
  namespaced: true,
  state: { current: null },
  mutations,
}
