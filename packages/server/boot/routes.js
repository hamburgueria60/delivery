/**
 * Created by Richard Lopes on 13/12/2015.
 *
 * Routing system
 */

const root = require('../controller/root.js')
const login = require('../controller/login.js')
const logout = require('../controller/logout.js')
const sync = require('../controller/sync.js')

module.exports = function routes(app) {
  // const router = app.loopback.Router()
  // router.get('/', root(app))
  // router.post('/login', login(app))
  // router.get('/logout', logout(app))
  // router.get('/settings/database/sync', sync(app))
  // app.use(router)
}
