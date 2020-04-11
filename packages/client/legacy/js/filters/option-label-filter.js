/**
 * Created by Richard Lopes on 27/12/2015.
 */

const app = angular.module('app')
app.filter('optionLabel', OptionLabel)

function OptionLabel($filter) {
  return function(input, options) {
    let label = ''
    if (input) {
      if (options) {
        const _options = options.filter(function(option) {
          return option.value === input
        })
        label = _options.length > 0 ? _options[0].label : label
        label = label.toLowerCase()
      }
    }
    return label
  }
}
