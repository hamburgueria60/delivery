import { Order } from '@/types/Order'

import { CreatingPersistStrategy } from './CreatingPersistStrategy'
import { EditingPersistStrategy } from './EditingPersistStrategy'
import { PersistStrategy } from './PersistStrategy'

export function getPersistStrategy(order: Order | Partial<Order>): PersistStrategy {
  return order.id ? new EditingPersistStrategy() : new CreatingPersistStrategy()
}
