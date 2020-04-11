/**
 * Created by Richard on 03/04/2016.
 */

;(function(angular) {
  angular.module('app').controller('FoodMenuController', FoodMenuController)

  function FoodMenuController($scope, $mdDialog, Item, ToolbarService) {
    ToolbarService.reset()

    ToolbarService.push({
      label: 'Adicionar item ao cardápio',
      icon: 'add',
      click: add,
    })

    Item.find({ filter: { include: 'category' } }, function(items) {
      $scope.items = items
      $scope.items.sort(function(a, b) {
        return a.name.localeCompare(b.name)
      })
    })

    $scope.edit = function(item) {
      $mdDialog.show({
        templateUrl: 'views/food-menu/add-edit-dialog.html',
        preserveScope: true,
        controller: EditItemController,
        clickOutsideToClose: true,
        locals: { item },
      })
    }

    function add() {
      $mdDialog.show({
        templateUrl: 'views/food-menu/add-edit-dialog.html',
        preserveScope: true,
        controller: AddItemController,
        clickOutsideToClose: true,
      })
    }
  }

  function AddEditItemController($scope, $state, $mdDialog, Category) {
    $scope.dismiss = $mdDialog.hide
    $scope.categories = Category.find()
    $scope.finally = function() {
      $scope.dismiss()
      $state.go($state.current.name, {}, { reload: true })
    }
  }

  function AddItemController($scope, $controller, ToastService, Item) {
    $controller(AddEditItemController, { $scope })

    $scope.title = 'Adicionar novo item'
    $scope.item = { itemId: 0 }
    $scope.save = function() {
      $scope.item.name = $scope.item.name.toUpperCase()
      Item.create($scope.item)
        .$promise.then(function() {
          ToastService.toast('O item foi criado com sucesso.')
        })
        .catch(function(err) {
          ToastService.toast('Não foi possível criar o item.')
          throw err
        })
        .then($scope.finally)
    }
  }

  function EditItemController($scope, $controller, ToastService, item) {
    $controller(AddEditItemController, { $scope })

    $scope.title = 'Editar item'
    $scope.delete = function() {
      $scope.item
        .$deleteById({ id: $scope.item.itemId })
        .then(function() {
          ToastService.toast('Removido com sucesso.')
        })
        .catch(function() {
          ToastService.toast('Não é possível remover um item ao qual já existem pedidos contendo o item.')
        })
        .then($scope.finally)
    }

    $scope.item = angular.copy(item)
    $scope.save = function() {
      $scope.item
        .$save()
        .then(function() {
          ToastService.toast('A edição do item concluída.')
          angular.extend(item, $scope.item)
        })
        .catch(function(err) {
          ToastService.toast('Não foi possível editar o item.')
          throw err
        })
        .then($scope.finally)
    }
  }
})(angular)
