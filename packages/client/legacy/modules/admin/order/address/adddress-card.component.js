;(function() {
  angular.module('h60.components.find-address').directive('addressCard', [
    function() {
      return {
        require: '^findAddress',
        scope: { address: '=?' },
        templateUrl: '/modules/admin/order/address/address-card.component.html',
        controllerAs: '$ctrl',
        controller: [
          '$scope',
          function($scope) {
            this.address = $scope.address
            this.client = this.address.clients[0]
            this.telephones = this.client.telephones
          },
        ],
        link(scope, element, attrs, findAddressCtrl) {
          scope.resetToDefault = findAddressCtrl.resetToDefault
        },
      }
    },
  ])
})()
