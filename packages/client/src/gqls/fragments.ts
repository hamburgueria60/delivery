import gql from 'graphql-tag'

export const call = gql`
  fragment call on Call {
    id
    createdAt
    read
    phoneNumber
    type
  }
`

export const order = gql`
  fragment order on Order {
    id
    shortid
    createdAt
    items {
      id
      itemId
      name
      price
      description
      quantity
      additionOrDiscount
    }
    type
    address {
      id
      streetName
      number
      location
      complement
      phoneNumber
    }
    deliveryFee
    additionOrDiscount
    table
    note
    payment {
      type
      service
      value
    }
    totalAmount
    subtotalAmount
    status
    attendant {
      id
      name
    }
  }
`
