/**
 * Created by Richard Lopes on 19/12/2015.
 */

const app = angular.module('app')
app.factory('AuthService', AuthService)

function AuthService() {
  const context = this
  context.currentUser = Math.random()
    .toString(36)
    .substring(7)
  return context
}
