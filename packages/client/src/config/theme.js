import angular from 'angular'

export default angular.module('app.theme', []).config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default').primaryPalette('orange').backgroundPalette('grey')
  $mdThemingProvider.theme('login').primaryPalette('orange').backgroundPalette('grey').dark()
}).name
