/* eslint-disable @typescript-eslint/no-explicit-any */
import assign from 'lodash/assign'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import { VNode } from 'vue'

const DATA_KEYS = [
  'class',
  'staticClass',
  'style',
  'attrs',
  'props',
  'domProps',
  'on',
  'nativeOn',
  'directives',
  'scopesSlots',
  'slot',
  'ref',
  'refInFor',
  'key',
]

function mutateKey(key: string | number): string {
  return `${key}-cloned-cid`
}

function extractData(vnode: VNode, isComp: boolean): any {
  const data = pick(vnode.data, DATA_KEYS)
  if (isComp) {
    const cOpts = vnode.componentOptions
    assign(data, {
      props: cOpts?.propsData,
      on: cOpts?.listeners,
    })
  }

  if (data.key) {
    data.key = mutateKey(data.key)
  }

  return data
}
export default function cloneVNode(createElement: Function, vnode: VNode, newData: any = {}): any {
  // use the context that the original vnode was created in.
  const isComp = !!vnode.componentOptions
  const isText = !vnode.tag // this will also match comments but those will be dropped, essentially
  const children = isComp ? vnode.componentOptions?.children : vnode.children

  if (isText) return vnode.text

  const data = extractData(vnode, isComp)

  const tag = isComp ? vnode.componentOptions?.Ctor : vnode.tag

  const childNodes = children ? children.map((c): any => cloneVNode(createElement, c)) : undefined

  const props = merge({}, data, newData, {
    class: [data.class, newData.class],
  })

  return createElement(tag, props, childNodes)
}
