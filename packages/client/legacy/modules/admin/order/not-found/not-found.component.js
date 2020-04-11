;(function(angular) {
  angular.module('h60.components.find-address').directive('phoneNotFound', [
    function() {
      return {
        require: '^findAddress',
        templateUrl: '/modules/admin/order/not-found/not-found.component.html',
        controllerAs: 'notFoundCtrl',
        controller: [
          '$scope',
          '$mdDialog',
          'ClientService',
          function($scope, $mdDialog, ClientService) {
            this.showAddClientDialog = showAddClientDialog

            /**
             * Exibe a caixa de diálogo para adicionar um novo cliente,
             * utilizando o número não encontrado
             * @param phoneNumber Número de telefone não encontrado
             */
            function showAddClientDialog(phoneNumber) {
              $mdDialog
                .show({
                  templateUrl: 'views/client/add-address.html',
                  controller: 'NewClientController',
                  locals: { phoneNumber },
                })
                .then(function() {
                  return ClientService.findBy(ClientService.PHONE, phoneNumber)
                })
                .then(function(addresses) {
                  if (addresses.length > 0) $scope.applyAddress(addresses[0])
                })
            }
          },
        ],
        link($scope, $element, $attrs, findAddressCtrl) {
          // controle visual dos tipos de pesquisa, a.k.a `searchType`
          angular.extend($scope, { PHONE: 'PHONE', ADDRESS: 'ADDRESS', NAME: 'NAME' })
          $scope.applyAddress = findAddressCtrl.apply
        },
      }
    },
  ])
})(angular)
