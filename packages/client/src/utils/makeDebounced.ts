import { debounce, get } from 'lodash'
import Vue from 'vue'

export default function makeDebounced(methodName: string, ms: number): Function {
  return debounce(function debounced(this: Partial<Vue>, eventName: string, eventHandler: Function): void {
    const fn = get(this, methodName)
    fn?.call(this, eventName, eventHandler)
  }, ms)
}
