;(function() {
  angular.module('h60.components.find-address').filter('phoneNumber', function() {
    return function(input) {
      if (!input) return

      const phoneMask8D = {
        areaCode: new StringMask('(00) 0000-0000'), // with area code
        simple: new StringMask('0000-0000'), // without area code
      }
      const phoneMask9D = {
        areaCode: new StringMask('(00) 00000-0000'), // with area code
        simple: new StringMask('00000-0000'), // without area code
      }
      const phoneMask0800 = {
        areaCode: null, // N/A
        simple: new StringMask('0000-000-0000'), // N/A, so it's "simple"
      }

      input = input
        .toString()
        .replace(/[^0-9]/g, '')
        .slice(0, 11)
      if (input.indexOf('0800') === 0) {
        input = phoneMask0800.simple.apply(input)
      } else if (input.length < 9) {
        input = phoneMask8D.simple.apply(input) || ''
      } else if (input.length < 10) {
        input = phoneMask9D.simple.apply(input)
      } else if (input.length < 11) {
        input = phoneMask8D.areaCode.apply(input)
      } else {
        input = phoneMask9D.areaCode.apply(input)
      }

      return input.trim().replace(/[^0-9]$/, '')
    }
  })
})()
