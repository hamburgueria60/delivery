;(function() {
  angular.module('app').directive('paidAmountOption', PaidAmountOption)

  function PaidAmountOption() {
    return {
      scope: { amount: '@', whenSelect: '&' },
      require: ['paidAmountOption', '^paidAmount'],
      controllerAs: 'optionCtrl',
      controller: ['$scope', PaidAmountOptionCtrl],
      link: PaidAmountOptionLinker,
      templateUrl: '/modules/admin/order/paid-amount/paid-amount-option.template.html',
    }

    function PaidAmountOptionCtrl($scope) {
      this.amount = $scope.amount
      this.isChecked = false
    }

    function PaidAmountOptionLinker($scope, $elem, $attrs, $ctrl) {
      const optionCtrl = $ctrl[0]
      const paidAmountCtrl = $ctrl[1]

      $scope.currentPaidAmount = paidAmountCtrl.currentPaidAmount
      $scope.setCurrentPaidAmount = setCurrentPaidAmount

      // checa a opção, se o valor da opção é igual ao valor da opção selecionada, casa haja
      optionCtrl.isChecked = optionCtrl.amount === paidAmountCtrl.currentPaidAmount
      // caso a opção tenha sido checada, isso significa que a opção atual deve ser selecionada
      if (optionCtrl.isChecked) paidAmountCtrl.selectedOption = optionCtrl

      /**
       * Define o valor pago pelo cliente e executa uma callback (whenSelect)
       * @param amount Valor pago pelo cliente
       */
      function setCurrentPaidAmount(amount) {
        paidAmountCtrl.clean()
        optionCtrl.isChecked = true
        paidAmountCtrl.selectedOption = optionCtrl

        if ($scope.whenSelect) {
          $scope.whenSelect({ $paidAmount: parseFloat(amount) })
        }
      }
    }
  }
})()
