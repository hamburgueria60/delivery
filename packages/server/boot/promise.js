const Promise = require('bluebird')

module.exports = () => {
  global.Promise = Promise
}
