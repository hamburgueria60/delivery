import { ADD_ORDER } from '@/gqls'
import { Nullable } from '@/types/Nullable'
import { Order } from '@/types/Order'
import Status from '@/types/Status'

import { PersistStrategy } from './PersistStrategy'

export class CreatingPersistStrategy extends PersistStrategy {
  constructor() {
    super('CreatingPersistStrategy', ADD_ORDER)
  }

  public async persist(order: Order, finalStatus: Status): Promise<Nullable<Order>> {
    const response = await this.makePersistMutation(order, finalStatus)
    return response.data?.addOrder
  }
}
