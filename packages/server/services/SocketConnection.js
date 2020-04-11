const SocketIO = require('socket.io')

const NOTIFICATION_KEY = 'Hamburgueria60#NotificationService'

module.exports = {
  init: http => {
    // TODO: provide a better way to get the server instance
    const io = SocketIO(http)

    // TODO: better logggin for debug purposes
    io.on('connection', mSocket => {
      mSocket.on(NOTIFICATION_KEY, message => {
        io.emit(NOTIFICATION_KEY, message)
      })
    })
  },
}
