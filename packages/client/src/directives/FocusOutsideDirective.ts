import { DirectiveBinding } from 'vue/types/options'

import { Nullable } from '@/types/Nullable'

interface FocusOutsideHTMLElement extends HTMLElement {
  out: Nullable<(event: FocusEvent) => void>
}

const bind = (el: HTMLElement, binding: DirectiveBinding): void => {
  const element = el as FocusOutsideHTMLElement

  const handler = function handler(event: FocusEvent): void {
    const { relatedTarget } = event

    if (!el.contains(relatedTarget as Node) || !relatedTarget) {
      binding.value()
    }
  }

  element.out = handler
  element.addEventListener<'focusout'>('focusout', handler)
}

const unbind = (el: HTMLElement): void => {
  const element = el as FocusOutsideHTMLElement

  if (element.out) {
    element.removeEventListener<'focusout'>('focusout', element.out)
  }

  element.out = null
}

export default {
  bind,
  unbind,
}
