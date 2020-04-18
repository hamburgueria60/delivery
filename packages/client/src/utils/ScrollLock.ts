import { Nullable } from '@/types/Nullable'

class ScrollLock {
  private parent: Nullable<HTMLElement> = null

  private scrollTop = 0

  public lockScroll(): void {
    this.parent =
      (document.documentElement.scrollTop && document.documentElement) ||
      (document.body.scrollTop && document.body) ||
      null

    this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

    document.body.style.position = 'fixed'
    document.body.style.top = `-${this.scrollTop}px`
  }

  public unlockScroll(): void {
    document.body.style.position = 'static'

    if (this.parent) {
      this.parent.scrollTop = this.scrollTop
    }
  }
}

export default ScrollLock
