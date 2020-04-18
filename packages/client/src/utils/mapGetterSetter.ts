/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce, get } from 'lodash'

interface Component {
  $store: any
}

export function makeGetter(context: string, state: string): any {
  return function getter(this: Component): any {
    return get(this.$store.state, [context, state].join('.'))
  }
}

export function makeDebouncedSetter(context: string, mutation: string | { x: string }): Function {
  return debounce(function setter(this: Component, value: any): void {
    const name = [context, mutation].join('/')
    this.$store.commit(name, value)
  }, 300)
}

export function makeSetter(context: string, mutation: string): Function {
  return function setter(this: Component, value: any): void {
    const name = [context, mutation].join('/')
    this.$store.commit(name, value)
  }
}

export function mapGetterSetter(context: string, mutationByState: { string: string }): {} {
  return Object.entries(mutationByState).reduce((wrapper, [state, mutation]): {} => {
    const mutationName = mutation

    return {
      ...wrapper,
      [state]: {
        get: makeGetter(context, state),
        set: makeSetter(context, mutationName),
      },
    }
  }, {})
}

export function mapDebouncedGetterSetter(context: string, mutationByState: { string: string }): {} {
  return Object.entries(mutationByState).reduce((wrapper, [state, mutation]): {} => {
    const mutationName = mutation

    return {
      ...wrapper,
      [state]: {
        get: makeGetter(context, state),
        set: makeDebouncedSetter(context, mutationName),
      },
    }
  }, {})
}
