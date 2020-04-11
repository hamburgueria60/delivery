module.exports = function loginRoute(app) {
  return function _route(request, response) {
    const data = {}

    const body = request && (request.body || request.params)
    if (body) {
      const type = (body.type === 'email' && 'email') || 'username'
      data[type] = body[type]
      data.password = body.password
    }

    app.models.User.login(data, 'user', (err, token) => {
      if (err) {
        request.session.error = err
        response.render('pages/login', { accessToken: null, error: err })
      } else {
        request.session.accessToken = token
        response.render('pages/main', { accessToken: token, error: null })
      }
    })
  }
}
