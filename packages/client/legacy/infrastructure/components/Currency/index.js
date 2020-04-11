import React from 'react'
import { FormattedNumber } from 'react-intl'

export default function Currency(props) {
  // TODO: BRL is a config
  const styleProps = { style: 'currency', currency: 'BRL' }
  return <FormattedNumber {...styleProps} {...props} />
}
