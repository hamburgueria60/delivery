module.exports = function root() {
  /**
   * Rout to root
   * @param request
   * @param response
   * @constructor
   */
  return function Root(request, response) {
    const context = {}

    if (request.session.error && Object.keys(request.session.error).length > 0) {
      context.error = request.session.error
    } else {
      context.error = null
    }

    if (request.session.accessToken) {
      context.accessToken = request.session.accessToken
      response.render('pages/main', context)
    } else {
      context.accessToken = null
      response.render('pages/login', context)
      context.error = null
      request.session.error = null
    }
  }
}
