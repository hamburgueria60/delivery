;(function() {
  angular.module('app').directive('paidAmount', PaidAmount)

  function PaidAmount() {
    return {
      scope: { currentPaidAmount: '@' },
      transclude: true,
      template: '<ng-transclude></ng-transclude>',
      controllerAs: 'paidAmountCtrl',
      controller: ['$scope', PaidAmountCtrl],
    }

    function PaidAmountCtrl($scope) {
      this.selectedOption = null
      this.currentPaidAmount = $scope.currentPaidAmount
      this.clean = function() {
        if (this.selectedOption) this.selectedOption.isChecked = false
      }
    }
  }
})()
