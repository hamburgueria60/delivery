import uuidv1 from 'uuid/v1'
import locations from '../data/locations'
import addresses from '../data/addresses'
import timeout from '../helpers/timeout'
import { DELAY  } from '../constants'

module.exports = {
  Mutation: {
    async addAddress(_, args) {
      await timeout(DELAY)

      const found = locations.find(location => args.address.location === location.id)
      const { name } = found
      const { deliveryFee } = found

      const address = {
        ...args.address,
        location: name,
        deliveryFee,
        id: uuidv1(),
      }

      addresses.push(address)
      return address
    },
  },
  Query: {
    async addresses(_, args) {
      await timeout(DELAY)

      if (args.phone) {
        return addresses.reduce((array, address) => {
          if (address.phoneNumber.toLowerCase().startsWith(args.phone.toLowerCase())) {
            array.push(address)
          }

          return array
        }, [])
      }

      return addresses
    },
  },
}
