;(function() {
  angular.module('app').controller('ItemDetailsController', ItemDetailsController)

  ItemDetailsController.$inject = ['$mdDialog', '$scope', 'order', 'item']
  function ItemDetailsController($mdDialog, $scope, order, item) {
    // métodos públicos
    $scope.addDetails = addDetails
    $scope.hide = $mdDialog.hide

    $scope.title = item.name
    $scope.details = {
      description: item.details,
      discount: item.discount,
      addition: item.addition,
    }

    // Ocultar o botão de ação para adicionar detalhes,
    // quando o mouse está sobre o item
    item.showDetailsAction = false

    /**
     * Efetivação da alteração dos detalhes na tela no objeto `order`, alterando também o objeto `item`,
     * insserindo detalhes, acréscimos e descontos
     */
    function addDetails() {
      item.details = $scope.details.description || null

      order.adjustAmount({ itemId: item.itemId, addition: $scope.details.addition })
      order.adjustAmount({ itemId: item.itemId, discount: $scope.details.discount })

      $mdDialog.hide()
    }
  }
})()
