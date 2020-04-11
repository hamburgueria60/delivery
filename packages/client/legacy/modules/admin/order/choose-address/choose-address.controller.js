;(function() {
  angular.module('app').controller('ChooseAddressController', ChooseAddressController)

  ChooseAddressController.$inject = ['$scope', '$mdDialog', 'addresses', 'ClientService']
  function ChooseAddressController($scope, $mdDialog, addresses, ClientService) {
    const context = $scope

    context.dialog = {}
    context.dialog.addresses = addresses
    context.dialog.chooseAddress = chooseAddress

    /**
     * Envia o endereço selecionado para a tela de pedido
     * @param address
     */
    function chooseAddress(address) {
      $mdDialog.hide(address)
    }
  }
})()
