import { withContext } from 'jest-with-context'

import { Nullable } from '@/types/Nullable'
import { Order } from '@/types/Order'

import { getPersistStrategy } from './getPersistStrategy'
import { PersistStrategy } from './PersistStrategy'

class TestContext {
  private order: Partial<Order>

  private persistStrategy: Nullable<PersistStrategy>

  public constructor() {
    this.order = {}
  }

  public givenPersistedOrder() {
    this.order = { id: '1' }
  }

  public whenGetPersistStrategy() {
    this.persistStrategy = getPersistStrategy(this.order)
  }

  public thenExpectPersistStrategyToBe(strategyName: string) {
    expect(this.persistStrategy?.name).toBe(strategyName)
  }
}

withContext('createOrder#getPersistStrategy', new TestContext(), ({ test }) => {
  test('should return CreatingPersistStrategy given a not persisted order', context => {
    context.whenGetPersistStrategy()
    context.thenExpectPersistStrategyToBe('CreatingPersistStrategy')
  })

  test('should return EditingPersistStrategy given a persisted order', context => {
    context.givenPersistedOrder()
    context.whenGetPersistStrategy()
    context.thenExpectPersistStrategyToBe('EditingPersistStrategy')
  })
})
