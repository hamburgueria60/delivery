/**
 * Created by Richard Lopes on 27/12/2015.
 */

const app = angular.module('app')
app.directive('capitalize', CapitalizeDirective)

function CapitalizeDirective() {
  return {
    require: 'ngModel',
    link(scope, element, attrs, modelCtrl) {
      const capitalize = function(inputValue) {
        if (inputValue == undefined) inputValue = ''
        const words = inputValue.split(' ')
        words.forEach(function(word, index) {
          if ((index === 0 && attrs.capitalize === 'first') || attrs.capitalize !== 'first')
            words[index] = word.charAt(0).toLocaleUpperCase() + word.slice(1)
        })

        const capitalized = words.join(' ')
        if (capitalized !== inputValue) {
          modelCtrl.$setViewValue(capitalized)
          modelCtrl.$render()
        }
        return capitalized
      }

      modelCtrl.$parsers.push(capitalize)
      capitalize(scope[attrs.ngModel]) // capitalize initial value
    },
  }
}
