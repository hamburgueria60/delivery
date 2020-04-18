import { get, head, isEqual } from 'lodash'

import { NUMBER_WITH_DDD_LENGTH } from '@/constants'
import GroupedItem from '@/types/GroupedItem'

import getInitialState from './initialState'
import { CreateOrderGetters, CreateOrderState } from './types'

type GroupedSelectedItems = Map<string, GroupedItem>

export function additionOrDiscountItemsOnly(state: CreateOrderState, getters: CreateOrderGetters): number {
  return getters.groupedSelectedItems.reduce((totalAmount: number, item: GroupedItem): number => {
    return totalAmount + item.additionOrDiscount
  }, 0)
}

export function totalAdditionOrDiscount(state: CreateOrderState, getters: CreateOrderGetters): number {
  return state.additionOrDiscount + getters.additionOrDiscountItemsOnly
}

export function isBlankOrder(state: CreateOrderState): boolean {
  if (state.persisted) return true

  const initialState = getInitialState()
  const stateAsRawObject = JSON.parse(JSON.stringify(state))
  const initialStateAsRawObject = JSON.parse(JSON.stringify(initialState))
  return isEqual(stateAsRawObject, initialStateAsRawObject)
}

export function paymentType(state: CreateOrderState): string {
  return (
    head(
      [
        state.payment.type === 'money' && 'dinheiro',
        state.payment.type === 'card' && 'cartão de crédito à vista ou débito',
      ].filter(Boolean),
    ) || ''
  )
}

export function subtotalAmount(state: CreateOrderState, getters: CreateOrderGetters): number {
  return getters.groupedSelectedItems.reduce((totalAmount, item): number => {
    return totalAmount + item.total
  }, 0)
}

export function totalAmount(state: CreateOrderState, getters: CreateOrderGetters): number {
  return state.deliveryFee + getters.subtotalAmount + getters.totalAdditionOrDiscount
}

export function change(state: CreateOrderState, getters: CreateOrderGetters): number {
  return state.payment.value - getters.totalAmount
}

export function isItemsStepDone(state: CreateOrderState): boolean {
  return state.selectedItems.length > 0
}

export function isLocationStepDone(state: CreateOrderState): boolean {
  switch (state.type) {
    case 'delivery':
      return (
        Boolean(state.phone) &&
        state.phone.length === NUMBER_WITH_DDD_LENGTH &&
        Boolean(state.address) &&
        Number(state.deliveryFee) > 0
      )
    case 'restaurant':
      return Boolean(state.table)
  }
  return false
}

export function isPaymentStepDone(state: CreateOrderState, getters: CreateOrderGetters): boolean {
  const { payment } = state
  const isDoneByType = {
    card: true,
    money: payment.value >= getters.totalAmount && payment.value > 0,
  }

  const isDoneByService = {
    postpaid: true,
    prepaid: isDoneByType[payment.type],
  }

  return isDoneByService[payment.service]
}

export function isPrintStepDone(state: CreateOrderState): boolean {
  return state.persisted
}

export function isAllStepsDone(_: CreateOrderState, getters: CreateOrderGetters): boolean {
  return getters.isItemsStepDone && getters.isLocationStepDone && getters.isPaymentStepDone
}

export function undoneSteps(_: CreateOrderState, getters: CreateOrderGetters): string[] {
  return [
    !getters.isItemsStepDone ? 'Itens' : '',
    !getters.isLocationStepDone ? 'Localização' : '',
    !getters.isPaymentStepDone ? 'Pagamento' : '',
  ].filter(Boolean)
}

export function doneSteps(_: CreateOrderState, getters: CreateOrderGetters): Set<number> {
  const done = new Set<number>()
  if (getters.isItemsStepDone) done.add(0)
  if (getters.isLocationStepDone) done.add(1)
  if (getters.isPaymentStepDone) done.add(2)
  if (getters.isPrintStepDone) done.add(3)
  return done
}

export function blockedSteps(state: CreateOrderState): Set<number> {
  if (state.persisted) {
    // blocking items, location, payment steps
    return new Set<number>([0, 1, 2])
  }
  return new Set<number>()
}

export function groupedSelectedItems(state: CreateOrderState): GroupedItem[] {
  const getQuantity = (groups: Map<string, GroupedItem>, id: string, item: Partial<GroupedItem>): number => {
    const groupQuantity = get(groups.get(id), 'quantity', 0)
    return item.quantity ? groupQuantity + item.quantity : groupQuantity + 1
  }

  const groups = state.selectedItems.reduce((groups, item): GroupedSelectedItems => {
    const { id } = item
    const quantity = getQuantity(groups, id, item)

    groups.set(id, {
      ...item,
      quantity,
      total: item.price * quantity,
      additionOrDiscount: item.additionOrDiscount || 0,
    })

    return groups
  }, new Map())

  return Array.from(groups.values())
}
