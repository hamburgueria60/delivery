export abstract class SelectInputCardType {
  public active = false

  public empty = false

  public loading = false

  public showSearchButton = false

  abstract placeholder(): boolean

  abstract input(): boolean

  abstract changeActiveWhenBlur(): boolean

  abstract isActionsVisible(): boolean

  abstract displayChildren(): boolean
}
