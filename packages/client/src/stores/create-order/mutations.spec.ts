// @ts-nocheck
import { head } from 'lodash'

import { SET_DESCRIPTION } from './mutations'

describe('SET_DESCRIPTION', () => {
  it('should add description of an item without description and change the key value', () => {
    const state = {
      selectedItems: [{ id: '5d9140c727d25d04c11937be', itemId: '5d9140c727d25d04c11937be' }],
    }

    SET_DESCRIPTION(state, {
      item: head(state.selectedItems),
      description: 'Com maionese extra',
    })

    expect(state.selectedItems).toEqual([
      {
        id: `${head(state.selectedItems).itemId}-com-maionese-extra`,
        itemId: head(state.selectedItems).itemId,
        description: 'Com maionese extra',
      },
    ])
  })

  it('should add description of an item with description and change the key value', () => {
    const state = {
      selectedItems: [{ id: '5d9140c727d25d04c11937be', itemId: '5d9140c727d25d04c11937be' }],
    }

    SET_DESCRIPTION(state, {
      item: head(state.selectedItems),
      description: 'Com maionese extra',
    })

    SET_DESCRIPTION(state, {
      item: head(state.selectedItems),
      description: 'Com presunto extra',
    })

    expect(state.selectedItems).toEqual([
      {
        id: `${head(state.selectedItems).itemId}-com-presunto-extra`,
        itemId: head(state.selectedItems).itemId,
        description: 'Com presunto extra',
      },
    ])
  })
})
