;(function() {
  angular.module('app').controller('AuthController', AuthController)

  function AuthController($rootScope, $scope, $http, $window, $timeout) {
    $scope.auth = {}
    $scope.isLoaded = false
    $scope.feedback = {}

    window.onload = function() {
      $timeout(function() {
        $scope.isLoaded = $rootScope.isDOMLoaded = true
      })
    }

    $scope.init = function(feedback) {
      $scope.feedback = feedback && JSON.parse(feedback)
    }

    $scope.login = function() {
      const identity = new Identity($scope.auth.identity)
      const { password } = $scope.auth
      if (identity && password) {
        const loginData = { type: identity.type(), password }
        loginData[identity.type()] = identity.toString()

        $http
          .post('/login', loginData)
          .success(function() {
            $window.location.reload()
          })
          .error(function(err) {
            throw err
          })
      }
    }
  }

  function Identity(string) {
    this.type = function() {
      return (this.email() && 'email') || 'username'
    }
    this.email = function() {
      const regex = new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]" +
          '(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
          '(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
      )
      return regex.exec(string)
    }
    this.toString = function() {
      return (string && string.toString && string.toString()) || null
    }
  }
})()
