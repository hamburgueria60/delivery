import { findLastIndex, get, isNil, kebabCase, omit } from 'lodash'

import GenericState from '@/types/GenericState'
import GroupedItem from '@/types/GroupedItem'
import Item from '@/types/Item'

import getInitialState from './initialState'
import { CreateOrderState as State } from './types'

type Mutation = (state: GenericState, value: string | object | number) => void

function dirty(this: State): void {
  if (!this.dirty) {
    this.dirty = true
  }
}

function add(property: string, callback?: Function): Mutation {
  return (state: GenericState, value): void => {
    state[property] = value
    callback?.call(state)
  }
}

export const SET_PHONE = add('phone', dirty)
export const SET_ADDRESS = add('address', dirty)
export const SET_TYPE = add('type', dirty)
export const SET_TABLE = add('table', dirty)
export const SET_PAYMENT = add('payment', dirty)
export const SET_DELIVERY_FEE = add('deliveryFee', dirty)
export const SET_PERSISTED = add('persisted', dirty)
export const SET_ADDITION_OR_DISCOUNT = add('additionOrDiscount', dirty)
export const SET_NOTE = add('note', dirty)
export const SET_IS_DRAFT_CONFIRM_OPEN = add('isDraftConfirmOpen', dirty)
export const SET_STATUS = add('status', dirty)
export const SET_ID = add('id', dirty)
export const SET_ITEM_ID = add('itemId', dirty)
export const SET_NEW_ORDER = add('newOrder')
export const SET_DIRTY = add('dirty')
export const SET_QUERY = add('query')
export const SET_UPDATE_LOCATION_DELIVERY_FEE = add('updateLocationDeliveryFee')

export const SET_ITEM_ADDITION_OR_DISCOUNT = (state: State, { item, amount }: { item: Item; amount: number }) => {
  state.selectedItems = state.selectedItems.map(selectedItem => {
    if (item.id === selectedItem.id) {
      selectedItem.additionOrDiscount = amount
    }
    return selectedItem
  })

  dirty.call(state)
}

export const GO_STEP = (state: State, step: number): void => {
  state.currentStep = step
}

export const ADD_ITEM = (state: State, selected: GroupedItem): void => {
  state.selectedItems.push({
    ...omit(selected, 'quantity', 'total'),
    // TODO: check
    quantity: 1,
  })

  dirty.call(state)
}

export const REMOVE_ITEM = (state: State, selected: GroupedItem): void => {
  const lastIndexOf = findLastIndex(state.selectedItems, (item: Item): boolean => item.id === selected.id)

  state.selectedItems = [...state.selectedItems.slice(0, lastIndexOf), ...state.selectedItems.slice(lastIndexOf + 1)]

  dirty.call(state)
}

export const SET_DESCRIPTION = (
  state: State,
  {
    item,
    description,
  }: {
    item: Item
    description: string
  },
): void => {
  state.selectedItems = state.selectedItems.map(
    (selected): Item => {
      const id = [item.itemId, kebabCase(description)].filter(Boolean).join('-')

      const itemWithDescription = {
        ...selected,
        ...(selected.id === item.id && !isNil(description) && { id, description }),
      }

      return itemWithDescription
    },
  )

  dirty.call(state)
}

export const SET_BOLD_STEP = (state: State, step: number): void => {
  state.boldSteps = new Set(state.boldSteps.add(step))
}

export const RESET = (moduleState: GenericState): void => {
  Object.keys(moduleState).forEach((key): void => {
    const state = getInitialState()
    moduleState[key] = get(state, key)
  })
}
