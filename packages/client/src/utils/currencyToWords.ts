import plural from './plural'

export default function currencyToWords(number: number): string {
  const integer = Math.trunc(number)
  const cents = Number((number % 1).toFixed(2).substring(2))

  return `${[
    integer && `${integer} ${plural(integer, 'real', 'reais')}`,
    cents && `${cents} ${plural(cents, 'centavo', 'centavos')}`,
  ]
    .filter(Boolean)
    .join(' e ')}.`
}
