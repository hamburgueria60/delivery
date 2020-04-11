;(function() {
  angular.module('app').controller('DashboardController', HomeController)

  function HomeController($scope, $mdSidenav, ToolbarService, dashboard) {
    ToolbarService.reset()

    $scope.today = dashboard.today
    $scope.week = dashboard.week
    $scope.month = dashboard.month
  }
})()
