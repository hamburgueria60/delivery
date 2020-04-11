/**
 * Created by Richard Lopes on 20/12/2015.
 */

const app = angular.module('app')
app.factory('NotificationService', NotificationService)

function NotificationService(SocketService, $mdDialog, $filter, Telephone) {
  const context = this

  context.initialize = function() {}

  function showNotification() {
    const notifUrl = 'views/components/notification/default-calling.html'
    const nArguments = arguments

    function NotificationController($scope, $state, $mdDialog) {
      let isCustomerNew = true
      if (nArguments.length == 2) {
        // number found
        // data
        const client = ($scope.client = nArguments[0])
        $scope.telephone = nArguments[1]
        isCustomerNew = false
      } else if (nArguments.length == 1) {
        // number not found
        $scope.telephone = { number: nArguments[0].phoneNumber }
      }

      // functions
      $scope.dismiss = $mdDialog.hide
      $scope.newOrderLink = `add-order({id: undefined, number: ${$scope.telephone.number} })`
    }

    $mdDialog.show({
      skipHide: true,
      templateUrl: notifUrl,
      controller: NotificationController,
    })
  }

  function findByNumber(mObject, success, empty, error) {
    if (mObject.phoneNumber.length > 0) {
      if (mObject.phoneNumber[0] === '0') {
        mObject.phoneNumber = mObject.phoneNumber.substring(1)
      }
    }

    Telephone.find(
      {
        filter: {
          include: {
            relation: 'client',
            scope: { include: 'addresses' },
          },
          where: { number: mObject.phoneNumber },
        },
      },
      function(telephones) {
        if (telephones.length === 0) empty ? empty() : null
        else {
          const telephone = telephones[0]
          const { client } = telephone
          success ? success(client, telephone) : null
        }
      },
      function(err) {
        error ? error() : null
      },
    )
  }

  SocketService.onReceive(receive)
  function receive(messageObject) {
    // alert("Você tem notificações pendentes.");
    findByNumber(
      messageObject,
      function(client, telephone) {
        showNotification(client, telephone)
      },
      function() {
        showNotification(messageObject)
      },
    )
  }

  return context
}
