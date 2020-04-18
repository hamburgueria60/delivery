import uuidv1 from 'uuid/v1'
import { isNil  } from 'lodash'
import locations from '../data/locations'
import timeout from '../helpers/timeout'
import { DELAY  } from '../constants'

module.exports = {
  Query: {
    async locations() {
      await timeout(DELAY)
      return locations
    },
  },
  Mutation: {
    async addLocation(_, args) {
      await timeout(DELAY)
      const location = { id: uuidv1(), name: args.name, deliveryFee: 0 }
      locations.push(location)
      return location
    },
    async updateLocation(_, args) {
      await timeout(DELAY)

      const location = locations.find(l => l.id === args.id)
      if (!isNil(args.name)) location.name = args.name
      if (!isNil(args.deliveryFee)) location.deliveryFee = args.deliveryFee
      return location
    },
  },
}
