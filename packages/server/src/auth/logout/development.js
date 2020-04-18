module.exports = (req, res) => {
  req.session.authenticated = false
  res.status(200).end()
}
