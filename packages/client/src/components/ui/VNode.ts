import { has, omit, pick } from 'lodash'
import { CreateElement, RenderContext, VNode } from 'vue'

import cloneVNode from '@/utils/cloneVNode'

type Props = {
  node: VNode
  context: {
    $createElement: CreateElement
  }
}

export default {
  functional: true,
  render: (h: CreateElement, ctx: RenderContext<Props>): VNode | VNode[] => {
    let createElement = h

    if (has(ctx.props, 'context')) {
      createElement = ctx.props.context.$createElement
    }

    return cloneVNode(createElement, ctx.props.node, {
      ...omit(ctx.props, 'context', 'node'),
      ...pick(ctx.data, 'on'),
    })
  },
}
