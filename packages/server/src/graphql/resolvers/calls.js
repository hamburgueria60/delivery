import uuidv1 from 'uuid/v1'
import timeout from '../helpers/timeout'
import { DELAY  } from '../constants'
import { pubsub  } from '../socket/pubsub'

const CALL_RECEIVED = 'CALL_RECEIVED'

const calls = []

module.exports = {
  Query: {
    async calls() {
      await timeout(DELAY)
      return calls
    },

    async receivedCalls() {
      await timeout(DELAY)
      return calls.filter(call => !call.read)
    },
  },
  Mutation: {
    async addCall(_, args) {
      await timeout(DELAY)
      const call = {
        id: uuidv1(),
        createdAt: new Date().toISOString(),
        type: 'CALL',
        read: false,
        phoneNumber: args.phoneNumber,
      }
      calls.unshift(call)
      pubsub.publish(CALL_RECEIVED, { callReceived: call })
      return call
    },

    async updateCallToRead(_, args) {
      await timeout(DELAY)
      const found = calls.find(call => call.id === args.id)
      found.read = true
      pubsub.publish(CALL_RECEIVED, { callReceived: found })
      return found
    },
  },
  Subscription: {
    callReceived: {
      subscribe: () => pubsub.asyncIterator([CALL_RECEIVED]),
    },
  },
}
