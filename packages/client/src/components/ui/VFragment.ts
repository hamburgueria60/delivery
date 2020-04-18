import { CreateElement, RenderContext, VNode } from 'vue'

type Props = {
  children: VNode | VNode[]
}

export default {
  functional: true,
  render(h: CreateElement, ctx: RenderContext<Props>): VNode | VNode[] {
    return ctx.children
  },
}
