describe('Item service', function() {
  let OrderService
  let ItemService

  // Load our api.users module
  beforeEach(angular.mock.module('h60.order'))

  // Set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_OrderService_, _ItemService_) {
    OrderService = _OrderService_
    ItemService = _ItemService_
  }))

  it('should return correct amount of an item', function() {
    const items = [
      { item: new ItemService.Item({ price: 1 }), value: 1 },
      { item: new ItemService.Item({ price: 5, discount: 3 }), value: 2 },
      { item: new ItemService.Item({ price: 5, addition: 3 }), value: 8 },
      { item: new ItemService.Item({ price: 5, discount: 3, addition: 2 }), value: 4 },
    ]

    items.forEach(function(obj) {
      expect(obj.item.amount()).toBe(obj.value)
    })
  })
})
