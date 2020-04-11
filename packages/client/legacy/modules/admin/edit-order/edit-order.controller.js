;(function() {
  angular.module('app').controller('EditOrderController', [
    '$controller',
    '$scope',
    '$state',
    'OrderService',
    'ClientService',

    function($controller, $scope, $state, OrderService, ClientService) {
      $controller('OrderController', { $scope }) // This works

      const { orderId } = $state.params
      if (orderId) {
        OrderService.findById(orderId)
          .then(function(order) {
            return ClientService.findBy(ClientService.ADDRESS_ID, order.addressId)
          })
          .then(function(addresses) {
            $scope.order.address = addresses[0]
            // console.log($scope.order.address.addressId);
            // console.log($scope.order);
          })
      }
    },
  ])
})(angular)
