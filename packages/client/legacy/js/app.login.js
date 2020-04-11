/**
 * Created by Richard Lopes on 09/07/2016.
 */

;(function() {
  const app = angular.module('app', ['ngMaterial', 'ngAria', 'ngMessages', 'ngLocale', 'angularMoment'])

  app.config(Config).run(Runner)

  let mdThemingProvider
  const ThemeManager = {}

  function Config($mdThemingProvider) {
    mdThemingProvider = $mdThemingProvider

    ThemeManager.initialize()
  }

  function Runner(amMoment) {
    amMoment.changeLocale('pt-br')
  }

  ThemeManager.initialize = function() {
    mdThemingProvider
      .theme('default')
      .primaryPalette('orange')
      .accentPalette('indigo')
      .backgroundPalette('grey')
  }
})()
