import { SelectInputCardMultiType } from './SelectInputCardMultiType'
import { SelectInputCardSingleType } from './SelectInputCardSingleType'
import { SelectInputCardType } from './SelectInputCardType'

const aliases = {
  single: SelectInputCardSingleType,
  multi: SelectInputCardMultiType,
}

export function getSelectTypeStrategy(strategy: 'single' | 'multi'): SelectInputCardType {
  const Strategy = aliases[strategy]
  return new Strategy()
}

export function mapSetters(attrs: string[]): {} {
  return attrs.reduce((o, attr) => {
    return {
      ...o,
      [attr]: function setter<S>(this: { typeStrategy: { [attr: string]: S } }, value: S): void {
        this.typeStrategy[attr] = value
      },
    }
  }, {})
}
