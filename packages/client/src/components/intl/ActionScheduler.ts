const SECOND = 1000

class ActionScheduler {
  public schedule(fn: Function): Function {
    const reference = setTimeout((): void => {
      fn()
      this.schedule(fn)
    }, 10 * SECOND)

    return (): void => {
      clearTimeout(reference)
    }
  }
}

export default new ActionScheduler()
