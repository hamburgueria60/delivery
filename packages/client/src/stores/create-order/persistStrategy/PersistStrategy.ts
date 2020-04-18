import { DocumentNode, FetchResult } from 'apollo-link'

import apolloClient from '@/api/apolloClient'
import { Nullable } from '@/types/Nullable'
import { Order } from '@/types/Order'
import Status from '@/types/Status'

import { Result } from './type'

export abstract class PersistStrategy {
  public name: string

  protected mutation: DocumentNode

  constructor(name: string, mutation: DocumentNode) {
    this.name = name
    this.mutation = mutation
  }

  protected async makePersistMutation(order: Order, finalStatus: Status): Promise<FetchResult<Result>> {
    return apolloClient.mutate<Result>({
      mutation: this.mutation,
      variables: {
        order: { ...order, status: finalStatus || order.status },
      },
    })
  }

  public abstract persist(order: Order, finalStatus: Status): Promise<Nullable<Order>>
}
