import { consumeURLParameter } from '@/utils/url'

import * as actions from './actions'
import * as getters from './getters'
import getInitialState from './initialState'
import mockState from './mockState'
import * as mutations from './mutations'

export * from './types'

const state = consumeURLParameter('m', { keep: true }) ? mockState : getInitialState()

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
