;(function(angular) {
  angular.module('h60.components').directive('toolbar', [
    'ToolbarService',
    function(ToolbarService) {
      return {
        require: 'toolbar',
        link: ToolbarLinker,
        controllerAs: 'toolbarCtrl',
        controller: [ToolbarCtrl],
      }

      function ToolbarCtrl() {
        this.items = []
      }

      function ToolbarLinker($scope, $elem, $attrs, $ctrl) {
        ToolbarService.reset()
        ToolbarService.source($ctrl.items)
      }
    },
  ])
})(angular)
