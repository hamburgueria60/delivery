;(function() {
  angular.module('app').controller('LoadingController', LoadingController)

  function LoadingController($rootScope, $scope) {
    $rootScope.$watch('isDOMLoaded', function(isDOMLoaded) {
      $scope.isLoaded = isDOMLoaded
    })
  }
})()
