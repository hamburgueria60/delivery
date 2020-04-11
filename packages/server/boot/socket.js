const SocketConnection = require('../services/SocketConnection')

module.exports = app => {
  app.on('started', () => {
    const server = app.get('server')
    SocketConnection.init(server)
  })
}
