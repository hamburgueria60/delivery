import items from '../data/items'
import timeout from '../helpers/timeout'
import { DELAY  } from '../constants'

module.exports = {
  Query: {
    async items(_, args) {
      await timeout(DELAY)

      if (args.name) {
        return items.filter(item => item.name.toLowerCase().startsWith(args.name.toLowerCase()))
      }

      return items
    },
  },
}
