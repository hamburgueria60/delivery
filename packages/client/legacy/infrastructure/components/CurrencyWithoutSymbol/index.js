import React from 'react'
import { FormattedNumber } from 'react-intl'

export default function CurrencyWithoutSymbol(props) {
  const styleProps = { style: 'decimal', minimumFractionDigits: 2 }
  return <FormattedNumber {...styleProps} {...props} />
}
