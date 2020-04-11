;(function(angular) {
  angular.module('h60.components').directive('toolbarItem', [
    function() {
      return {
        scope: { eventHandler: '&ngClick', icon: '@', isDisabled: '=', label: '<?' },
        require: ['^toolbar', 'toolbarItem'],
        controllerAs: 'itemCtrl',
        controller: ['$scope', ToolbarItemCtrl],
        link: ToolbarItemLinker,
      }

      function ToolbarItemCtrl($scope) {
        this.click = $scope.eventHandler
        this.icon = $scope.icon
        this.disabled = $scope.isDisabled
        this.label = $scope.label
      }

      function ToolbarItemLinker($scope, $elem, $attrs, $ctrl) {
        const toolbarCtrl = $ctrl[0]
        const itemCtrl = $ctrl[1]
        toolbarCtrl.items.push(itemCtrl)

        $scope.$watch('isDisabled', function(isDisabled) {
          itemCtrl.disabled = isDisabled
        })
      }
    },
  ])
})(angular)
