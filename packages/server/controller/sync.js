const axios = require('axios')

module.exports = function sync() {
  return async (request, response) => {
    try {
      await axios.get('http://localhost:3022')
      response.status(200).send('OK')
    } catch (e) {
      response.status(500).send(e)
    }
  }
}
