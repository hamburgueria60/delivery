angular.module('h60.components.find-address').directive('findAddress', [
  function FindAddressDirective() {
    return {
      require: ['?ngModel', 'findAddress'],
      scope: { default: '@', whenDone: '&', whenReset: '&' },
      restrict: 'E',
      templateUrl: '/modules/admin/order/find-address/find-address.template.html',
      controller: [
        '$state',
        '$scope',
        'FindAddressService',
        'ClientService',
        'OrderService',
        function FindAddressCtrl($state, $scope, FindAddressService, ClientService, OrderService) {
          const context = this
          const defaultAttr = $scope.default

          // controle visual dos tipos de pesquisa, a.k.a `searchType`
          angular.extend($scope, {
            PHONE: 'PHONE',
            ADDRESS: 'ADDRESS',
            NAME: 'NAME',
            TAKEOUT: 'TAKEOUT',
          })

          context.isSearching = false
          context.isNotFound = false
          context.isFound = false
          context.address = null
          context.searchManager = {
            query: '',
            searchType: $scope[defaultAttr && defaultAttr.toUpperCase()] || $scope.PHONE,
          }

          context.changeState = changeState
          context.resetToDefault = resetToDefault
          context.apply = apply
          $scope.search = search
          $scope.switchTo = switchTo

          OrderService.setType(context.searchManager.searchType === 'TAKEOUT' ? 'TAKEOUT' : 'DELIVERY')

          if ($state.params.number) {
            $state.params.number = FindAddressService.fixNumber($state.params.number)
            changeState($state.params.number)

            const { number } = $state.params
            FindAddressService.search(ClientService.PHONE, number)
              .then(function(address) {
                apply(address)
              })
              .catch(function() {
                apply()
              })
          } else if ($state.params.id) {
            const { id } = $state.params
            ClientService.findBy(ClientService.CLIENT_ID, id)
              .then(function(addresses) {
                apply(addresses[0])
              })
              .catch(function() {
                context.isSearching = true
              })
          } else {
            context.isSearching = true
          }

          /**
           * Redefine a busca para o estado original, removendo os endereços e consultas outrora realizadas
           */
          function resetToDefault() {
            context.isFound = false
            context.isNotFound = false
            context.isSearching = true
            context.searchManager.query = ''
            context.address = null

            changeState()

            if ($scope.whenDone) {
              $scope.whenDone()
            }
          }

          /**
           * Alterna entre os tipos de pesquisa, limpando a query de consulta
           * @param type Tipo de pesquisa a alteranar
           */
          function switchTo(type) {
            context.searchManager.searchType = type
            context.searchManager.query = ''

            OrderService.setType(type === 'TAKEOUT' ? 'TAKEOUT' : 'DELIVERY')
          }

          /**
           * Aplica um objeto `address` ao componente
           * @param address Endereço
           */
          function apply(address) {
            let client
            let telephone

            if (!address) {
              context.isNotFound = true
              context.isSearching = false

              context.searchManager.query = context.searchManager.query || $state.params.number
              context.searchManager.query = FindAddressService.fixNumber(context.searchManager.query)
            } else {
              client = address.clients[0]

              context.isFound = true
              context.isNotFound = false
              context.isSearching = false

              // repasse de dados para a view
              context.address = address

              telephone = client.telephones.find(function(phone) {
                return phone.number === $state.params.number
              })

              // adicionando endereço ao controller
              if ($scope.whenDone) {
                $scope.whenDone({ $address: address, $phone: telephone })
              }

              return client
            }
          }

          /**
           * Realiza a pesquisa utilizando o tipo de pesquisa e a query de consulta,
           * `searchManager.searchType` e `searchManager.query`, respectivamente.
           */
          function search() {
            const { searchType } = context.searchManager
            let { query } = context.searchManager

            if (searchType === $scope.PHONE) {
              query = FindAddressService.fixNumber(query)
            }

            return FindAddressService.search(searchType, query)
              .then(function(address) {
                return apply(address)
              })
              .catch(function(err) {
                if (err === FindAddressService.NOT_FOUND) apply()
              })
              .then(function(client) {
                if (searchType === $scope.PHONE) {
                  changeState(query)
                } else {
                  changeState(null, client && client.clientId)
                }
              })
          }

          /**
           * Altera o estado da rota atual para inserir o número buscado
           * @param [number] Número do cliente
           * @param [id] Id de um cliente (pré-definido)
           */
          function changeState(number, id) {
            const queryParams = {}

            queryParams.number = number
            queryParams.id = id

            $state.go($state.current.name, queryParams, {
              location: true,
              inherit: true,
              notify: false,
            })
          }
        },
      ],
      controllerAs: '$ctrl',
      link: function FindAddressLinker($scope, $elem, $attrs, $ctrl) {
        const ngModelCtrl = $ctrl[0]
        const findAddressCtrl = $ctrl[1]

        if (ngModelCtrl) {
          $scope.$watchCollection(
            () => {
              return ngModelCtrl.$modelValue
            },
            address => {
              if (address) findAddressCtrl.apply(address)
            },
          )
        }
      },
    }
  },
])
