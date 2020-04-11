;(function() {
  angular.module('app').service('amountPaidOptions', AmountPaidOptions)

  /**
   * Armazena o valor a ser pago, selecionado pelo cliente.
   */
  function AmountPaidOptions() {
    const context = this

    context.currentPaidAmount = 0
    context.setCurrentPaidAmount = setCurrentPaidAmount

    function setCurrentPaidAmount(amount) {
      context.currentPaidAmount = amount
    }
  }
})()
