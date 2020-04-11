;(function() {
  angular.module('h60.client').controller('NewClientController', NewClientController)

  NewClientController.$inject = ['$scope', '$mdDialog', 'phoneNumber', 'Client', 'ToastService']
  function NewClientController($scope, $mdDialog, phoneNumber, Client, ToastService) {
    const context = $scope

    context.enabledAddBtn = true
    context.telephone = { number: phoneNumber }
    context.client = {}
    context.address = {}

    // Show client and telephone inputs
    context.showAllFields = true
    context.prettyMode = 'Adicionar'
    context.dismiss = $mdDialog.hide
    context.add = add

    function add() {
      let { name } = context.client
      name = name === '' ? null : name

      const address = {
        addressId: 0,
        streetName: context.address.streetName,
        number: context.address.number,
        neighborhood: context.address.neighborhood,
        block: context.address.block,
        referencePoint: context.address.referencePoint,
      }
      const number = phoneNumber.substring(0, 11)
      const client = {
        clientId: 0,
        name,
        addresses: [address],
        telephones: [{ telephoneId: 0, number }],
      }

      context.enabledAddBtn = false
      return Client.createWithBounds(client).$promise.then(function(data) {
        return $mdDialog.hide(data.client.clientId)
      })
    }
  }
})()
