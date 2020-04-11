export default class ChangeStream {
  constructor({ url, filter }) {
    this.url = `${url}/change-stream?_format=event-stream`
    this.filter = filter
  }

  onReceived(callback) {
    const queryString = Object.entries(this.filter)
      .map(e => e.join('='))
      .join('&')

    this.stream = new EventSource(`${this.url}?${queryString}`)
    this.stream.addEventListener('data', message => {
      const data = JSON.parse(message.data)
      if (callback) callback(data)
    })
  }
}
