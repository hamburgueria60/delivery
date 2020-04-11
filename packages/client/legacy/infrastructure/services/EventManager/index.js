class EventManager extends EventTarget {
  emit(name, data) {
    const event = new CustomEvent(name, { detail: data })
    this.dispatchEvent(event)
  }

  on(name, callback) {
    const ref = ({ detail }) => callback(detail)

    this.addEventListener(name, ref)

    return function off() {
      this.removeEventListener(name, ref)
    }
  }
}

const eventManager = new EventManager()

if (process.env.NODE_ENV !== 'production') {
  window.eventManager = eventManager
}

export default eventManager
