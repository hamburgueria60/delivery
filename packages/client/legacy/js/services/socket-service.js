;(function() {
  angular.module('app').service('SocketService', [
    'AuthService',
    function(AuthService) {
      const url = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`
      const context = this
      const socket = io.connect(url)
      const privateKey = 'Hamburgueria60#NotificationService'
      const { currentUser } = AuthService
      let receiveCb

      context.initialize = initialize
      context.send = send
      context.onReceive = onReceive
      context.receive = receive

      function initialize() {
        socket.on(privateKey, context.receive)
      }

      function send(data) {
        if (typeof data !== 'object') return
        if (data.message !== '') {
          const mSerialized = (function() {
            data = angular.extend(data, { user: currentUser })
            return JSON.stringify(data)
          })()
          socket.emit(privateKey, mSerialized)
        }
      }

      function onReceive(cb) {
        receiveCb = cb
      }

      function receive(message) {
        console.log(message)

        let mReceived
        try {
          mReceived = JSON.parse(message)
        } catch (e) {
          mReceived = message
        }

        if (typeof mReceived === 'object') {
          if (mReceived.user !== currentUser) {
            console.log(mReceived)
            receiveCb ? receiveCb(mReceived) : null
          }
        } else {
          console.log(mReceived)
        }
      }
    },
  ])
})()
