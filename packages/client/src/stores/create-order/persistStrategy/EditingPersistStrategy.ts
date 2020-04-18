import { UPDATE_ORDER } from '@/gqls'
import { Nullable } from '@/types/Nullable'
import { Order } from '@/types/Order'
import Status from '@/types/Status'

import { PersistStrategy } from './PersistStrategy'

export class EditingPersistStrategy extends PersistStrategy {
  constructor() {
    super('EditingPersistStrategy', UPDATE_ORDER)
  }

  public async persist(order: Order, finalStatus: Status): Promise<Nullable<Order>> {
    this.mutation = UPDATE_ORDER
    const response = await this.makePersistMutation(order, finalStatus)
    return response.data?.updateOrder
  }
}
