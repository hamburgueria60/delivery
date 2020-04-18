import { Attendant } from '@/types/Attendant'

import { UserState } from './types'

export const SET_CURRENT_USER = (state: UserState, user: Attendant) => {
  state.current = user
}
