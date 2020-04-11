describe('Order service', function() {
  let OrderService
  let ItemService

  // Load our api.users module
  beforeEach(angular.mock.module('h60.order'))

  // Set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_OrderService_, _ItemService_) {
    OrderService = _OrderService_
    ItemService = _ItemService_
  }))

  it('should add correctly the items to the order', function() {
    const order = new OrderService.Order()

    order.add(new ItemService.Item({ itemId: 2 }))
    expect(Object.keys(order.items).length).toBe(1) // as quantidades de itens devem ser iguais
    expect(order.items[2].itemId).toBe(2) // os ids devem ser iguais
  })

  it('should add multiple item to the order with their own quantities', function() {
    const order = new OrderService.Order()

    order.add(new ItemService.Item({ itemId: 1 }))
    order.add(new ItemService.Item({ itemId: 1 }))
    order.add(new ItemService.Item({ itemId: 1 }))

    const item2 = new ItemService.Item({ itemId: 2 })
    order.add(item2)
    order.add(item2)

    order.add(new ItemService.Item({ itemId: 3 }))
    order.add(new ItemService.Item({ itemId: 3 }))
    order.add(new ItemService.Item({ itemId: 3 }))

    expect(Object.keys(order.items).length).toBe(3)
    expect(order.items[1].quantity).toBe(3)
    expect(order.items[2].quantity).toBe(2)
    expect(order.items[3].quantity).toBe(3)
  })

  it('should return the sum of all items prices as order total', function() {
    const order = new OrderService.Order()

    order.add(new ItemService.Item({ itemId: 1, price: 1 })) // 1
    order.add(new ItemService.Item({ itemId: 1, price: 1 })) // 1
    order.add(new ItemService.Item({ itemId: 2, price: 2 })) // 2
    order.add(new ItemService.Item({ itemId: 3, price: 3 })) // 3
    order.add(new ItemService.Item({ itemId: 3, price: 3 })) // 3
    expect(order.total).toBe(10)
  })

  it('should return the sum of all items prices, considering addition and discounts', function() {
    const order = new OrderService.Order()

    order.add(new ItemService.Item({ itemId: 1, price: 1 })) // 1
    order.add(new ItemService.Item({ itemId: 1, price: 1 })) // 1
    order.add(new ItemService.Item({ itemId: 2, price: 2 })) // 2
    order.add(new ItemService.Item({ itemId: 3, price: 3 })) // 3
    order.add(new ItemService.Item({ itemId: 3, price: 3 })) // 3
    order.add(new ItemService.Item({ itemId: 3, price: 3 })) // 3
    order.add(new ItemService.Item({ itemId: 3, price: 3 })) // 3
    // 3*4 + 2*1 + 1*2 = 12 + 2 + 2 = 16

    order.adjustAmount({ itemId: 1, addition: 10 }) // 16 + 10 = 26
    order.adjustAmount({ itemId: 3, discount: 5 }) // 26 - 5 = 21

    expect(order.total).toBe(21)

    order.adjustAmount({ itemId: 3, discount: 6 }) // 26 - 6 = 20
    expect(order.total).toBe(20)
  })

  it('should add and remove one item from the order', function() {
    const order = new OrderService.Order()

    order.add(new ItemService.Item({ itemId: 1, price: 1 }))
    order.add(new ItemService.Item({ itemId: 1, price: 1 }))
    order.add(new ItemService.Item({ itemId: 2, price: 2 }))
    order.add(new ItemService.Item({ itemId: 3, price: 3 }))
    order.add(new ItemService.Item({ itemId: 3, price: 3 }))
    order.remove(1)
    order.remove(3)
    expect(order.total).toBe(6)
    order.remove(1)
    expect(order.total).toBe(5)
  })

  it('should do nothing when removing unexisting item', function() {
    const order = new OrderService.Order()
    order.remove(1)
    order.remove(1)
    order.remove(1)
    expect(order.total).toBe(0)
  })

  it('should reset the order', function() {
    const order = new OrderService.Order()
    order.add(new ItemService.Item({ itemId: 1, price: 1 }))
    order.add(new ItemService.Item({ itemId: 1, price: 1 }))
    order.add(new ItemService.Item({ itemId: 2, price: 2 }))
    order.add(new ItemService.Item({ itemId: 3, price: 3 }))
    order.add(new ItemService.Item({ itemId: 3, price: 3 }))
    order.reset()
    expect(order.total).toBe(0)
    expect(Object.keys(order.items).length).toBe(0)
  })
})
