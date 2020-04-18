import gql from 'graphql-tag'

import { call, order } from './fragments'

export const GET_RECEIVED_CALLS = gql`
  query GET_RECEIVED_CALLS {
    receivedCalls {
      ...call
    }
  }
  ${call}
`

export const SUBSCRIBE_TO_CALL_RECEIVED = gql`
  subscription calls {
    callReceived {
      ...call
    }
  }
  ${call}
`

export const GET_ADDRESSES = gql`
  query GET_ADDRESSES($phone: String) {
    addresses(phone: $phone) {
      id
      streetName
      number
      complement
      location
      deliveryFee
      phoneNumber
    }
  }
`

export const GET_ORDERS = gql`
  query GET_ORDERS($status: [String]) {
    draftOrders(status: $status) {
      ...order
    }
    allOrdersExceptDraft(status: $status) {
      ...order
    }
  }
  ${order}
`

export const UPDATE_ORDER = gql`
  mutation UPDATE_ORDER($order: OrderInput!) {
    updateOrder(order: $order) {
      ...order
    }
  }
  ${order}
`

export const ADD_ORDER = gql`
  mutation ADD_ORDER($order: OrderInput!) {
    addOrder(order: $order) {
      ...order
    }
  }
  ${order}
`

export const DELETE_ORDER = gql`
  mutation DELETE_ORDER($id: ID!) {
    deleteOrder(id: $id)
  }
`

export const GET_ITEMS = gql`
  query GET_ITEMS($name: String) {
    items(name: $name) {
      id
      name
      price
    }
  }
`

export const GET_LOCATIONS = gql`
  query GET_LOCATIONS {
    locations {
      id
      name
      deliveryFee
    }
  }
`

export const GET_ME = gql`
  query GET_ME {
    me {
      id
      name
    }
  }
`

export const ADD_ADDRESS = gql`
  mutation ADD_ADDRESS($address: AddressInput!) {
    addAddress(address: $address) {
      id
      streetName
      number
      complement
      location
      deliveryFee
      phoneNumber
    }
  }
`

export const ADD_LOCATION = gql`
  mutation ADD_LOCATION($name: String) {
    addLocation(name: $name) {
      id
      name
      deliveryFee
    }
  }
`

export const UPDATE_LOCATION = gql`
  mutation UPDATE_LOCATION($id: ID!, $name: String, $deliveryFee: Float) {
    updateLocation(id: $id, name: $name, deliveryFee: $deliveryFee) {
      id
      name
      deliveryFee
    }
  }
`
