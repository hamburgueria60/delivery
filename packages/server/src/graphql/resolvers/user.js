import user from '../data/user'
import timeout from '../helpers/timeout'
import { DELAY  } from '../constants'

module.exports = {
  Query: {
    async me() {
      await timeout(DELAY)
      return user
    },
  },
}
