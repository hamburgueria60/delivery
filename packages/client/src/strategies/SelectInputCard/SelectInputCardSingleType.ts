import { SelectInputCardType } from './SelectInputCardType'

export class SelectInputCardSingleType extends SelectInputCardType {
  public placeholder(): boolean {
    return !this.active && this.empty
  }

  public input(): boolean {
    return this.active
  }

  public changeActiveWhenBlur(): boolean {
    return !this.showSearchButton
  }

  public isActionsVisible(): boolean {
    return !this.loading
  }

  public displayChildren(): boolean {
    return !this.active
  }
}
