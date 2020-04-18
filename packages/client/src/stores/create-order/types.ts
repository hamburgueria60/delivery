import Address from '@/types/Address'
import GroupedItem from '@/types/GroupedItem'
import Item from '@/types/Item'
import { Nullable } from '@/types/Nullable'
import Payment from '@/types/Payment'
import Status from '@/types/Status'

interface UpdateLocationDeliveryFee {
  id: string
}

export interface CreateOrderState {
  additionOrDiscount: number
  address?: Address
  deliveryFee: number
  id?: string
  note: string
  payment: Payment
  phone: string
  selectedItems: Item[]
  table: string
  type?: string
  status: Status
  // internal
  boldSteps: Set<number>
  currentStep: number
  dirty: boolean
  isDraftConfirmOpen: boolean
  newOrder: boolean
  persisted: boolean
  query: string
  updateLocationDeliveryFee: Nullable<UpdateLocationDeliveryFee>
}

export interface CreateOrderGetters {
  isBlankOrder: boolean
  paymentType: boolean
  subtotalAmount: number
  totalAmount: number
  change: number
  isItemsStepDone: boolean
  isLocationStepDone: boolean
  isPaymentStepDone: boolean
  isPrintStepDone: boolean
  isAllStepsDone: boolean
  undoneSteps: boolean
  doneSteps: Set<number>
  blockedSteps: Set<number>
  groupedSelectedItems: GroupedItem[]
  additionOrDiscountItemsOnly: number
  totalAdditionOrDiscount: number
}
