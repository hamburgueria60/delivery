import Address from './Address'
import { Attendant } from './Attendant'
import Item from './Item'
import Payment from './Payment'
import Status from './Status'

export interface Order {
  id?: string
  type?: string
  items: Item[]
  address: Address
  deliveryFee: number
  additionOrDiscount: number
  table: string
  note: string
  payment: Payment
  totalAmount: number
  subtotalAmount: number
  status: Status
  attendant?: Partial<Attendant>
}
