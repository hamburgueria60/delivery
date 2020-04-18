import { countBy } from 'lodash'

export function getMathSignal(numberOrCurrency: string | number, previousValue: number): number {
  if (typeof numberOrCurrency === 'number') {
    return numberOrCurrency < 0 ? -1 : 1
  }

  const numberOfMinusSignals = countBy(numberOrCurrency)['-'] || 0
  const willBeEven = numberOfMinusSignals % 2 === 0
  const mathSignal = willBeEven ? 1 : -1

  if (previousValue < 0) {
    if (willBeEven) return -1
  }

  return mathSignal
}

export function getAbsoluteValue(value: string | number): string | number {
  if (typeof value === 'number') return Math.abs(value)

  const regexp = /R\$(\s*)(\d+\.)*\d+(,|\.)\d+/g
  const match = regexp.exec(value)

  if (match) return match[0]

  return value
}

export function currencyToNumber(value: string | number): number {
  if (typeof value === 'number') return value

  const replaced = value.replace(/R|\$|\s|,|\.|[a-zA-Z]/g, '')
  const number = Number(replaced)
  return number / 100
}

export function numberToCurrency(value: string | number): string {
  const number = currencyToNumber(value)
  const amount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(number))
  return amount
}
