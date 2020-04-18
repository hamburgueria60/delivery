import addMinutes from 'date-fns/addMinutes'
import { random, range, sample } from 'lodash'
import randomWords from 'random-words'

import createOrder from '../helpers/create-order'

module.exports = range(0, 30).map(() => {
  const type = sample(['restaurant', 'delivery'])
  return createOrder({
    type,
    createdAt: addMinutes(new Date(), -6).toISOString(),
    attendant: {
      id: 'd58f0141-d656-4451-804c-e716febf7ada',
      name: 'John Doe',
    },
    items: [
      {
        id: '5d9140c727d25d04c11937be',
        itemId: '5d9140c727d25d04c11937be',
        name: 'Salada Cheese',
        price: 12,
        quantity: 1,
        description: randomWords(5).join(' '),
      },
      {
        id: '5d9140c727d25d04c11937be-abc',
        itemId: '5d9140c727d25d04c11937be',
        name: 'Salada Cheese',
        price: 12,
        quantity: 2,
        description: randomWords(5).join(' '),
      },
    ],
    address:
      type === 'delivery'
        ? {
            id: '42fd7255-7007-4af3-abf6-67c3f9737585',
            streetName: sample([
              'Avenida Djalma Batista',
              'Rua 41',
              'Rua Antônio Santos Carvalhinho',
              'Rua João Ribeiro',
              'Avenida Camapuã',
            ]),
            number: sample(['60', '839']),
            complement: 'Qd. 4 - Prox. Ao Ponto Do Queijo 2',
            location: sample(['Cidade Nova', 'Japiim I', 'Alvorada', 'Parque 10']),
            distance: null,
            phoneNumber: sample(['92981766071', '19999549974']),
          }
        : undefined,
    deliveryFee: 0,
    additionOrDiscount: 0,
    table: type === 'restaurant' ? sample(range(1, 20).map(number => `${number}`)) : undefined,
    payment: {
      value: random(0, 100),
      type: sample(['money', 'card']),
      service: sample(['prepaid', 'postpaid']),
    },
    totalAmount: 12,
    subtotalAmount: 12,
    note: sample(['', 'R$ 32 reais em cartão e o restante em dinheiro']),
  })
})
