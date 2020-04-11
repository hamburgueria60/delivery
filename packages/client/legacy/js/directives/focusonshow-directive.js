/**
 * Created by Richard on 09/02/2016.
 */

;(function() {
  angular.module('app').directive('focusOnShow', function($timeout) {
    return {
      restrict: 'A',
      link($scope, $element, $attr) {
        if ($attr.ngShow) {
          $scope.$watch($attr.ngShow, function(newValue) {
            if (newValue) {
              $timeout(function() {
                $element.find('input').focus()
              }, 0)
            }
          })
        }
        if ($attr.ngHide) {
          $scope.$watch($attr.ngHide, function(newValue) {
            if (!newValue) {
              $timeout(function() {
                $element.find('input').focus()
              }, 0)
            }
          })
        }
      },
    }
  })
})()
