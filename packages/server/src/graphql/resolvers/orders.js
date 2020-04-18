import createOrder from '../helpers/create-order'

import { remove  } from 'lodash'
import orders from '../data/orders'
import timeout from '../helpers/timeout'
import { DELAY, STATUS  } from '../constants'

module.exports = {
  Query: (() => {
    async function getOrders(_, { lastStatus }) {
      await timeout(DELAY)
      return orders.filter(order => {
        return !lastStatus || lastStatus.includes(order.lastStatus)
      })
    }

    async function allOrdersExceptDraft(_, { lastStatus }) {
      return (await getOrders(null, { lastStatus })).filter(order => {
        return order.lastStatus !== STATUS.DRAFT
      })
    }

    async function draftOrders(_, { lastStatus }) {
      return (await getOrders(null, { lastStatus })).filter(order => {
        return order.lastStatus === STATUS.DRAFT
      })
    }

    return { allOrdersExceptDraft, draftOrders, orders: getOrders }
  })(),
  Mutation: {
    async addOrder(_, args) {
      await timeout(DELAY)
      const order = createOrder(args.order)
      return order
    },
    async updateOrder(_, args) {
      await timeout(DELAY * 2)
      const order = orders.find(o => o.id === args.order.id)
      Object.keys(args.order).forEach(key => {
        order[key] = args.order[key]
      })
      return order
    },
    async deleteOrder(_, args) {
      await timeout(DELAY * 2)
      remove(orders, o => o.id === args.id)
    },
  },
}
