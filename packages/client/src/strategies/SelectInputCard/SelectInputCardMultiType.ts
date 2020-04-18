import { SelectInputCardType } from './SelectInputCardType'

export class SelectInputCardMultiType extends SelectInputCardType {
  public placeholder(): boolean {
    return !this.active && this.empty
  }

  public input(): boolean {
    return this.active || !this.empty
  }

  public changeActiveWhenBlur(): boolean {
    return true
  }

  public isActionsVisible(): boolean {
    return this.empty && !this.active && !this.loading
  }

  public displayChildren(): boolean {
    return true
  }
}
