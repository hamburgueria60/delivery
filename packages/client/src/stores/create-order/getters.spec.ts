import { withContext } from 'jest-with-context'

import { groupedSelectedItems } from './getters'

describe('createOrder#getters', () => {
  class TestContext {
    // @ts-ignore
    private state

    // @ts-ignore
    private groupedSelectedItems

    public givenEmptySelectedItems() {
      this.state = { selectedItems: [] }
    }

    public givenTwoDifferentItemsWithTwoOccurrencesEach() {
      this.state = {
        selectedItems: [
          { id: '1', price: 3 },
          { id: '1', price: 3 },
          { id: '2', price: 4 },
          { id: '2', price: 4 },
        ],
      }
    }

    public givenThreeDifferentItemsWithVariousOccurrencesEach() {
      this.state = {
        selectedItems: [
          { id: '1', price: 3, quantity: 2 },
          { id: '1', price: 3, quantity: 3 },
          { id: '1', price: 3, quantity: 4 },
          { id: '2', price: 4, quantity: 5 },
          { id: '2', price: 4, quantity: 6 },
          { id: '2', price: 4, quantity: 7 },
          { id: '3', price: 4, quantity: 1 },
        ],
      }
    }

    public whenGroupSelectedItems() {
      this.groupedSelectedItems = groupedSelectedItems(this.state)
    }

    public thenExpectGroupedItemsToBeEmpty() {
      expect(this.groupedSelectedItems).toEqual([])
    }

    public thenExpectTwoGroupedItemsWithSummedTotal() {
      expect(this.groupedSelectedItems).toEqual([
        expect.objectContaining({ id: '1', price: 3, quantity: 2, total: 6 }),
        expect.objectContaining({ id: '2', price: 4, quantity: 2, total: 8 }),
      ])
    }

    public thenExpectThreeGroupedItemsWithSummedTotal() {
      expect(this.groupedSelectedItems).toEqual([
        expect.objectContaining({
          id: '1',
          price: 3,
          quantity: 9,
          total: 9 * 3,
        }),
        expect.objectContaining({
          id: '2',
          price: 4,
          quantity: 18,
          total: 18 * 4,
        }),
        expect.objectContaining({
          id: '3',
          price: 4,
          quantity: 1,
          total: 1 * 4,
        }),
      ])
    }
  }

  withContext('', new TestContext(), ({ test }) => {
    test('should return a empty array when there is not items selected', context => {
      context.givenEmptySelectedItems()
      context.whenGroupSelectedItems()
      context.thenExpectGroupedItemsToBeEmpty()
    })

    test('should group two similar items into two groups', context => {
      context.givenTwoDifferentItemsWithTwoOccurrencesEach()
      context.whenGroupSelectedItems()
      context.thenExpectTwoGroupedItemsWithSummedTotal()
    })

    test('should group three similar items into three groups', context => {
      context.givenThreeDifferentItemsWithVariousOccurrencesEach()
      context.whenGroupSelectedItems()
      context.thenExpectThreeGroupedItemsWithSummedTotal()
    })
  })
})
