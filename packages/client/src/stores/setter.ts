import GenericState from '@/types/GenericState'

const setter = (name: string, stateName: string, callback?: () => void): {} => {
  return {
    [name](state: GenericState, value: string | number | object): void {
      state[stateName] = value
      callback?.call(state)
    },
  }
}

export default setter
