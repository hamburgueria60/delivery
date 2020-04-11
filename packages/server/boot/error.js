const errorHandler = require('strong-error-handler')

module.exports = app => {
  app.use(
    errorHandler({
      debug: app.get('env') === 'development',
      log: true,
    }),
  )
}
