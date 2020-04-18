import Status from '@/types/Status'

import { CreateOrderState } from './types'

export default (): CreateOrderState => ({
  additionOrDiscount: 0,
  address: undefined,
  boldSteps: new Set<number>(),
  currentStep: 0,
  deliveryFee: 0,
  dirty: false,
  isDraftConfirmOpen: false,
  newOrder: false,
  note: '',
  payment: { value: 0, type: 'money', service: 'prepaid' },
  persisted: false,
  phone: '',
  query: '',
  selectedItems: [],
  status: Status.Creating,
  table: '',
  type: undefined,
  updateLocationDeliveryFee: null,
})
