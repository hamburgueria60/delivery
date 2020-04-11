import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import $ from 'jquery'
import shortid from 'shortid'
import OrderDetailsPrintable from 'features/Restaurant/Dashboard/components/OrderDetailsPrintable'

export default function print() {
  const id = shortid()
  const content = document.createElement('div')

  ReactDOM.render(
    <IntlProvider locale="pt-BR">
      <OrderDetailsPrintable />
    </IntlProvider>,
    content,
  )

  const elements = $('body > *')

  // hide visible elements
  elements.addClass(id).hide()

  // add element
  $('body').append(content)

  // print dialog
  window.print()

  // remove added element
  $(content).remove()

  // show invisible elements
  elements.show()
}
