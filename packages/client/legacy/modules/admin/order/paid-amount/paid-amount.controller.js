;(function() {
  angular.module('app').controller('PaidAmountController', PaidAmountController)

  PaidAmountController.$inject = ['$scope', '$mdDialog', 'order']
  function PaidAmountController($scope, $mdDialog, order) {
    $scope.payment = {}
    $scope.payment.setPaidAmount = setPaidAmount
    $scope.payment.setPaidAmountToTotal = setPaidAmountToTotal
    $scope.payment.saveCustomValue = saveCustomValue
    $scope.payment.paidAmount = order.paidAmount
    $scope.payment.showCustomAmountView = false
    $scope.dismiss = $mdDialog.hide

    /**
     * Define o valor pago pelo cliente
     * @param $paidAmount
     */
    function setPaidAmount($paidAmount) {
      order.paidAmount = $paidAmount
      $scope.dismiss()
    }

    function setPaidAmountToTotal() {
      order.paidAmount = order.total
      $scope.dismiss()
    }

    function saveCustomValue() {
      order.paidAmount = $scope.payment.amount || 0
      $scope.dismiss()
    }
  }
})()
