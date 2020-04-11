/**
 * Created by Richard on 27/03/2016.
 */

;(function() {
  angular.module('app').controller('OrderHistoryController', OrderHistoryController)

  function OrderHistoryController($scope, $state, ToolbarService, Order) {
    ToolbarService.reset()

    $scope.load = function() {
      const only7DaysBefore = moment().add(-7, 'days')
      $scope.orders = Order.find({
        filter: {
          include: ['address', 'telephone'],
          order: 'createdAt DESC',
          where: {
            createdAt: { gte: only7DaysBefore },
          },
        },
      })
    }

    $scope.details = function(order) {
      $state.go('print-order', { id: order.orderId })
    }
    ;(function() {
      $scope.load()
    })()
  }
})()
