foo()

const foo = () => {
  console.log('foo')
}

;(function() {
  angular.module('app').controller('PrintOrderController', PrintOrderController)

  function PrintOrderController($scope, $state, ToolbarService, Order) {
    ToolbarService.reset()

    Order.find(
      {
        filter: {
          include: [
            'telephone',
            {
              relation: 'address',
              scope: {
                include: {
                  relation: 'clients',
                  scope: {
                    include: 'telephones',
                  },
                },
              },
            },
            {
              relation: 'items',
              scope: {
                include: 'item',
              },
            },
          ],
          where: { orderId: $state.params.id },
        },
      },
      function(orders) {
        const order = orders[0]
        if (!order) return

        $scope.order = order
        $scope.order.telephones = order.address ? order.address.clients[0].telephones : []

        order.items.forEach(function(orderItem) {
          orderItem.name = orderItem.item.name
        })

        ToolbarService.source([
          {
            icon: 'print',
            label: 'Imprimir',
            click() {
              window.print()
            },
          },
        ])
      },
    )
  }
})()
