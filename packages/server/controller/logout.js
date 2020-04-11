module.exports = function logoutRoute(app) {
  return (request, response, next) => {
    const { accessToken } = request.session

    if (!accessToken) {
      response.status(401).send()
      return
    }

    app.models.User.logout(accessToken.id)
      .then(() => {
        request.session.accessToken = null
        response.redirect('/')
      })
      .catch(err => {
        next(err)
      })
  }
}
