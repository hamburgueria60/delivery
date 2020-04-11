;(function() {
  angular.module('app').controller('OrderController', OrderController)

  OrderController.$inject = [
    '$scope',
    '$mdDialog',
    '$state',
    '$filter',
    '$timeout',
    'ToolbarService',
    'ScrollService',
    'ValidationService',
    'DeliveryTax',
    'ItemService',
    'OrderService',
    'ClientService',
    'FindAddressService',
  ]
  function OrderController(
    $scope,
    $mdDialog,
    $state,
    $filter,
    $timeout,
    ToolbarService,
    ScrollService,
    ValidationService,
    DeliveryTax,
    ItemService,
    OrderService,
    ClientService,
    FindAddressService,
  ) {
    // Timeout para buscas instantâneas
    let searchDelay

    $scope.order = new OrderService.Order()
    $scope.clientService = ClientService

    $scope.addItemToOrder = addItemToOrder
    $scope.removeItemFromOrder = removeItemFromOrder
    $scope.finishOrder = finishOrder
    $scope.resetOrder = resetOrder
    $scope.toggleOrderItemsVisibility = toggleOrderItemsVisibility
    $scope.showItemsWhenFocused = showItemsWhenFocused

    $scope.attachAddressToOrder = attachAddressToOrder
    $scope.detachAddressFromOrder = detachAddressFromOrder

    // dialogs
    $scope.showChangePaidDialog = showChangePaidDialog
    $scope.showAddDetailsDialog = showAddDetailsDialog
    $scope.associateTaxToTheAddress = associateTaxToTheAddress

    // pesquisa de itens
    $scope.$watch('order.search.query', function(value) {
      if (searchDelay) $timeout.cancel(searchDelay)
      searchDelay = $timeout(function() {
        putItemsOnList(value)
      }, 150)
    })

    putItemsOnList()

    /**
     * Coloca todos os itens disponíveis no pedido
     * @param [query] Query de busca para os itens
     */
    function putItemsOnList(query) {
      query = query || ''
      // filterando os items através de search.query
      $scope.order._items.then(function(items) {
        $scope.order.search.filteredItems = $filter('filter')(items, query)
        $scope.order.search.afterSearch()
        searchDelay = null
      })
    }

    /**
     * View: adiciona um item ao pedido
     * @param item Item
     * @param order Pedido
     * @param options Opções de adição
     */
    function addItemToOrder(item, order, options) {
      options = options || {}
      if (!searchDelay) order.add(item, options)
    }

    /**
     * View: remove um item do pedido
     * @param item Item
     * @param order Pedido
     */
    function removeItemFromOrder(item, order) {
      order.remove(item.itemId)
    }

    /**
     * Volta o pedido para o estado inicial
     * @param order
     */
    function resetOrder(order) {
      order.reset()
    }

    /**
     * Alternar a visibilidade dos items.
     * Ver `order.toggleVisibility`
     * @param order Pedido
     */
    function toggleOrderItemsVisibility(order) {
      order._items.then(function(items) {
        order.toggleVisibility(items, { strict: true })
      })
    }

    /**
     * Quando o input de pesquisa de itens estiver em foco
     * @param order
     */
    function showItemsWhenFocused(order) {
      order.toggleVisibility({ strict: true })
    }

    /**
     * Adicionar um endereço a um pedido Configurações de pesquisa
     * @param $address Endereço a ser adicionado. Atualmente, repassado através da diretiva.
     * @param order Pedido a receber o endereço
     */
    function attachAddressToOrder($address, $phone, order) {
      order.attachAddress($address)
      order.attachPhone($phone)
    }

    /**
     * Remover um endereço do pedido
     * @param order Pedido
     */
    function detachAddressFromOrder(order) {
      order.detachAddress()
    }

    /**
     * Finaliza o pedido, enviando-o para a tela de impressão
     * @param order
     */
    function finishOrder(order) {
      order.isSending = true
      order
        .finish()
        .then(function(_order) {
          $state.go('print-order', { id: _order.orderId })
        })
        .catch(function(err) {
          console.error((err && err.stack) || err)
        })
        .finally(function() {
          order.isSending = false
        })
    }

    function associateTaxToTheAddress(order) {
      if (order.address) {
        $mdDialog
          .show({
            templateUrl: 'modules/admin/order/empty-tax/empty-tax-dialog.html',
            clickOutsideToClose: true,
            locals: { neighborhood: order.address.neighborhood, tax: order.deliveryTax },
            controller: 'EmptyTaxDialogController as taxCtrl',
          })
          .then(function(deliveryTax) {
            if (deliveryTax !== null) order.deliveryTax = deliveryTax
          })
      }
    }

    function showAddDetailsDialog(item, order, event) {
      if (event) event.stopPropagation()

      $mdDialog.show({
        templateUrl: 'modules/admin/order/item-details.dialog.html',
        clickOutsideToClose: true,
        locals: { order, item },
        controller: 'ItemDetailsController',
      })
    }

    function showChangePaidDialog(order) {
      $mdDialog.show({
        templateUrl: 'modules/admin/order/paid-amount/paid-amount.dialog.html',
        clickOutsideToClose: true,
        locals: { order },
        controller: 'PaidAmountController',
      })
    }
  }
})()
