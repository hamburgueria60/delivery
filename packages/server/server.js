const loopback = require('loopback')
const boot = require('loopback-boot')
const path = require('path')

const app = loopback()

app.start = () => {
  const server = app.listen(() => {
    const baseUrl = app.get('url').replace(/\/$/, '')
    console.log('Web server listening at: %s', baseUrl)

    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })

  app.set('server', server)
  app.emit('started')

  return server
}

boot(app, __dirname, err => {
  if (err) throw err
  if (require.main === module) app.start()
})

module.exports = app
