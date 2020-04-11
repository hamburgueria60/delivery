/**
 * the HTML5 autofocus property can be finicky when it comes to dynamically loaded
 * templates and such with AngularJS. Use this simple directive to
 * tame this beast once and for all.
 *
 * Usage:
 * <input type="text" autofocus>
 *
 * License: MIT
 */

;(function() {
  const app = angular.module('app')
  app.directive('autofocus', AutofocusDirective)

  function AutofocusDirective($timeout) {
    return {
      restrict: 'A',
      link($scope, $element) {
        // $timeout(function () {
        //  $element[0].focus();
        // });
      },
    }
  }
})()
