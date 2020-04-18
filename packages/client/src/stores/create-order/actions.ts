import { omit, range } from 'lodash'

import apolloClient from '@/api/apolloClient'
import { UPDATE_LOCATION } from '@/gqls'
import Item from '@/types/Item'
import { Nullable } from '@/types/Nullable'
import { Order } from '@/types/Order'
import Status from '@/types/Status'

import { RootState } from '../types'
import { getPersistStrategy } from './persistStrategy'
import { CreateOrderGetters as Getters, CreateOrderState as State } from './types'

type Context = {
  state: State
  getters: Getters
  rootState: RootState
  commit: (name: string, value: boolean | string | number | object | undefined | null) => void
}

export async function editDraftOrder(context: Context, order: Order): Promise<void> {
  const state = context.state as State

  context.commit('SET_PHONE', order.address?.phoneNumber)
  context.commit('SET_ADDRESS', order.address)
  context.commit('SET_TYPE', order.type)
  context.commit('SET_TABLE', order.table)
  context.commit('SET_PAYMENT', order.payment)
  context.commit('SET_ADDITION_OR_DISCOUNT', order.additionOrDiscount)
  context.commit('SET_NOTE', order.note)
  context.commit('SET_DELIVERY_FEE', order.deliveryFee)
  context.commit('SET_STATUS', order.status)
  context.commit('SET_ID', order.id)

  order.items.forEach((item): void => {
    range(0, item.quantity).forEach((): void => {
      context.commit('ADD_ITEM', item)
      context.commit('SET_DESCRIPTION', {
        item,
        description: item.description,
      })
    })
  })

  state.dirty = false
}

export async function persist(context: Context, finalStatus: Status): Promise<Nullable<Order>> {
  const state = context.state as State
  const getters = context.getters as Getters
  const { User } = context.rootState

  const order: Order = {
    attendant: omit(User.current, '__typename'),
    type: state.type,
    items: getters.groupedSelectedItems.map((item): Item => omit(item, '__typename', 'total')),
    address: omit(state.address, '__typename'),
    deliveryFee: state.deliveryFee,
    additionOrDiscount: state.additionOrDiscount,
    table: state.table,
    payment: omit(state.payment, '__typename'),
    totalAmount: getters.totalAmount,
    subtotalAmount: getters.subtotalAmount,
    status: state.status,
    id: state.id,
    note: state.note,
  }

  const persistStrategy = getPersistStrategy(order)
  const data = await persistStrategy.persist(order, finalStatus)

  if (finalStatus !== Status.Draft) {
    context.commit('SET_PERSISTED', true)
  }

  context.commit('SET_DIRTY', false)

  return data
}

export const updateLocationDeliveryFee = async (context: Context) => {
  const state = context.state as State

  if (state.updateLocationDeliveryFee) {
    await apolloClient.mutate({
      mutation: UPDATE_LOCATION,
      variables: {
        id: state.updateLocationDeliveryFee.id,
        deliveryFee: state.deliveryFee,
      },
    })
  }
}
