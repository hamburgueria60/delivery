;(function() {
  angular.module('h60.components.find-address').service('FindAddressService', [
    '$q',
    '$mdDialog',
    'ClientService',
    function($q, $mdDialog, ClientService) {
      const context = this

      context.NOT_FOUND = "The query provided isn't related to any client, phone or address."
      context.search = search
      context.fixNumber = fixNumber

      /**
       * Exibe a caixa de diálogo para seleção de endereço
       * @param searchType Tipo de pesquisa
       * @param query Query para consulta
       */
      function search(searchType, query) {
        return findAddress(searchType, query)
          .then(function(addresses) {
            if (addresses.length > 1) {
              return $mdDialog.show({
                templateUrl: 'modules/admin/order/choose-address/choose-address.dialog.html',
                clickOutsideToClose: true,
                locals: { addresses },
                controller: 'ChooseAddressController',
              })
            }
            if (addresses.length === 1) {
              return $q.resolve(addresses[0])
            }
          })
          .then(function(address) {
            if (!address) return $q.reject(context.NOT_FOUND)
            return address
          })
      }

      function findAddress(searchType, query) {
        return ClientService.findBy(searchType, query)
      }

      /**
       * Corrige o número quanto ao DDD e ao nono dígito
       * @param {String} phoneNumber Número do telefone
       * @returns {String}
       */
      function fixNumber(phoneNumber) {
        if ([8, 9].indexOf(phoneNumber.length) >= 0) {
          const DDD = '92'
          const prefix = `${DDD}9`
          const mustHaveLength = 11
          return prefix.substring(0, mustHaveLength - phoneNumber.length) + phoneNumber
        }

        return phoneNumber
      }
    },
  ])
})()
