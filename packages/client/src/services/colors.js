import angular from 'angular'
import material from 'angular-material'

export default angular.module('app.providers.colors', [material]).factory('$colors', ($mdColors) => {
  return {
    get(colorExpression) {
      return $mdColors.getThemeColor(colorExpression)
    },
  }
}).name
