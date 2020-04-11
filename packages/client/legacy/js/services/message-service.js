/**
 * Created by Richard Lopes on 27/12/2015.
 */

const app = angular.module('app')
app.factory('MessageService', MessageService)

function MessageService() {
  const context = this

  context.switchCreateAnother =
    'Ao clicar no seletor, você pode criar vários registros, ' +
    'pois a caixa de diálogo não será fechada ao finalizar.'

  return context
}
