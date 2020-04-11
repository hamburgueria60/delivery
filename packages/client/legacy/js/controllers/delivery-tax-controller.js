/**
 * Created by Richard on 27/03/2016.
 */

;(function() {
  angular
    .module('app')
    .controller('DeliveryTaxDialogController', DeliveryTaxDialogController)
    .controller('DeliveryTaxesController', DeliveryTaxesController)

  function DeliveryTaxesController($scope, $mdDialog, ToolbarService, DeliveryTax) {
    $scope.load = function() {
      $scope.deliveryTaxes = []
      DeliveryTax.find({ filter: { order: 'neighborhood ASC' } }, function(taxes) {
        $scope.deliveryTaxes = taxes
      })
    }

    /**
     * Abre a caixa de diálogo para edição de taxa
     * @param tax Taxa
     */
    $scope.editTax = function(tax) {
      if (!tax) return

      $mdDialog.show({
        templateUrl: 'views/delivery-taxes/tax.html',
        scope: $scope,
        preserveScope: true,
        controller: EditTaxController,
        clickOutsideToClose: true,
        locals: { tax },
      })
    }

    /**
     * Abre a caixa de diálogo para adição de taxa
     */
    function addTax() {
      $mdDialog.show({
        templateUrl: 'views/delivery-taxes/tax.html',
        scope: $scope,
        preserveScope: true,
        controller: AddTaxController,
        clickOutsideToClose: true,
      })
    }

    ;(function() {
      $scope.load()

      ToolbarService.reset()
      ToolbarService.push({
        label: 'Adicionar nova taxa de entrega',
        icon: 'add',
        click: addTax,
      })
    })()
  }

  function DeliveryTaxDialogController($scope, $state, $mdDialog) {
    $scope.dismiss = $mdDialog.hide
    $scope.afterSave = function() {
      $scope.dismiss()
      $state.transitionTo($state.current, $state.params, {
        reload: true,
        inherit: false,
        notify: true,
      })
    }
  }

  function AddTaxController($scope, $controller, DeliveryTax) {
    $controller('DeliveryTaxDialogController', { $scope })

    $scope.mode = 'add'
    $scope.prefixTitle = 'Adicionar'
    $scope.tax = { taxId: 0 }

    $scope.save = function() {
      DeliveryTax.create($scope.tax, function(tax) {
        $scope.tax = tax
        $scope.afterSave()
      })
    }
  }

  function EditTaxController($scope, $controller, $mdToast, DeliveryTax, tax) {
    $controller('DeliveryTaxDialogController', { $scope })

    $scope.mode = 'edit'
    $scope.prefixTitle = 'Editar'
    $scope.tax = tax

    $scope.save = function() {
      DeliveryTax.prototype$updateAttributes(
        {
          taxId: tax.taxId,
        },
        tax,
        function(tax) {
          $scope.tax = tax
          $scope.afterSave()
        },
      )
    }

    $scope.delete = function() {
      DeliveryTax.removeById(
        { id: tax.taxId },
        function() {
          $scope.afterSave()
        },
        function(errorResponse) {
          errorResponse = errorResponse.data.error
          toast(
            `${'Não foi possível remover a taxa. Talvez já existam pedidos associados à mesma. #'}${
              errorResponse.errno
            }`,
          )
        },
      )
    }

    function toast(message) {
      return $mdToast.show(
        $mdToast
          .simple()
          .position('bottom right')
          .textContent(message),
      )
    }
  }
})()
