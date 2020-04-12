import angular from 'angular'

export default angular.module('app.theme', []).config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default').primaryPalette('blue').backgroundPalette('grey')
}).name
