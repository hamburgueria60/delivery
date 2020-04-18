import Address from '@/types/Address'
import Status from '@/types/Status'

import initialState from './initialState'
import { CreateOrderState } from './types'

const isProduction = process.env.NODE_ENV !== 'production'

const mockState: CreateOrderState = {
  additionOrDiscount: 0,
  address: new Address({
    id: '42fd7255-7007-4af3-abf6-67c3f9737585',
    streetName: 'Rua 41',
    number: '839',
    complement: 'Qd. 4 - Prox. Ao Ponto Do Queijo 2',
    location: 'Japiim I',
    distance: null,
    phoneNumber: '92981766071',
  }),
  boldSteps: new Set<number>(),
  dirty: true,
  currentStep: 1,
  deliveryFee: 2,
  isDraftConfirmOpen: false,
  newOrder: true,
  note: 'Qualquer anotação, mesmo.',
  payment: { value: 50, type: 'money', service: 'prepaid' },
  persisted: false,
  phone: '92981766071',
  query: '',
  selectedItems: [
    {
      id: '5d9140c727d25d04c11937be',
      itemId: '5d9140c727d25d04c11937be',
      name: 'Salada Cheese',
      price: 12,
      additionOrDiscount: 0,
      quantity: 1,
    },
  ],
  status: Status.Creating,
  table: '',
  type: 'delivery',
  updateLocationDeliveryFee: null,
}

export default isProduction ? mockState : initialState()
