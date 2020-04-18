const resolveGetter = <S, T>(
  getters: { [name: string]: (state: S, getters: S) => T },
  getterName: string,
  state: S,
) => {
  const getter = getters[getterName]
  return getter(state, state)
}

export default resolveGetter
