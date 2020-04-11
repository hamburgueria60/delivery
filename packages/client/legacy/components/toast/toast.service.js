;(function() {
  angular.module('h60.components').factory('ToastService', ['$mdToast', ToastService])

  function ToastService($mdToast) {
    return {
      toast(message) {
        return $mdToast.show(
          $mdToast
            .simple()
            .position('bottom right')
            .textContent(message),
        )
      },
    }
  }
})()
