/**
 * Created by Richard Lopes on 25/12/2015.
 */

const app = angular.module('app')
app.factory('Service', Service)

function Service() {
  const context = this

  context.initialize = function() {}

  return context
}
