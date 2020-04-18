import timeout from '../../graphql/helpers/timeout'

module.exports = async (req, res) => {
  req.session.authenticated = true

  await timeout(1000)
  if (req.body.user === 'fail') {
    res.status(401).end()
  } else {
    res.status(200).end()
  }
}
