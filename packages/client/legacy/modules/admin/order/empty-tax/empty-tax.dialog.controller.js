;(function() {
  angular.module('app').controller('EmptyTaxDialogController', [
    '$scope',
    '$timeout',
    '$mdDialog',
    'Address',
    'DeliveryTax',
    'tax',
    'neighborhood',

    function($scope, $timeout, $mdDialog, Address, DeliveryTax, tax, neighborhood) {
      const context = this

      context.shouldUpdate = !tax
      context.neighborhood = neighborhood
      context.deliveryTax = tax || 0
      context.save = save
      context.cancel = cancel

      function save() {
        let $promise = $mdDialog.hide(context.deliveryTax)

        if (context.shouldUpdate) {
          $promise = DeliveryTax.findOne({
            filter: { where: { neighborhood } },
          })
            .$promise.then(function(deliveryTax) {
              if (deliveryTax) {
                deliveryTax.value = context.deliveryTax
                return deliveryTax.$save()
              }
            })
            .catch(function() {
              return DeliveryTax.create({
                taxId: 0,
                neighborhood,
                value: context.deliveryTax,
              }).$promise
            })
            .finally(function() {
              return $promise
            })
        }

        return $promise
      }

      function cancel() {
        return $mdDialog.cancel()
      }
    },
  ])
})()
