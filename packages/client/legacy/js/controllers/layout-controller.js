/**
 * Created by Richard Lopes on 25/12/2015.
 */

const app = angular.module('app')
app.controller('LayoutController', LayoutController)

function LayoutController($scope, $mdSidenav, ToolbarService, ApplicationService) {
  /**
   * Items from side menu
   */

  $scope.defaultClickAction = function(click) {
    if (!$mdSidenav('sideNav').isLockedOpen()) $mdSidenav('sideNav').toggle()
    click ? click() : null
  }

  /**
   * Toggle the exhibition of side nav
   */
  $scope.toggleSideNav = function() {
    $mdSidenav('sideNav').toggle()
  }

  function main() {
    $scope.items = ToolbarService.source([])
    $scope.mPrintMode = false
  }

  $scope.applicationService = ApplicationService

  main()
}
