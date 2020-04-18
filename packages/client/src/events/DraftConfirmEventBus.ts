import Vue from 'vue'

export const CONFIRM = 'CONFIRM'
export const CANCEL = 'CANCEL'

class EventBus extends Vue {
  public onceCofirmOrCancel(): Promise<boolean> {
    return new Promise((resolve): void => {
      this.$once(CONFIRM, (): void => resolve(true))
      this.$once(CANCEL, (): void => resolve(false))
    })
  }
}

export default new EventBus()
