/**
 * Created by Richard Lopes on 20/12/2015.
 */

;(function() {
  const app = angular.module('app').controller('OrderSearchClientController', OrderSearchClientController)

  function OrderSearchClientController($scope, $state, $mdDialog, ToolbarService, Client, Address, Telephone) {
    /**
     * Initializações, chamadas de funções
     */
    $scope.load = function() {
      $scope.view = {}
      $scope.params = {}

      // Busca de clientes
      $scope.search = { client: searchClient }

      // Atalho: instância de order no controller local
      $scope.$parent.order = $scope.$parent.order || {}
      $scope.order = $scope.$parent.order || {}

      // Copiar objeto local para o pai
      $scope.$parent.order = angular.extend($scope.$parent.order, $scope.order)

      // Parâemtros da URL
      $scope.params.clientId = $state.params.id
      $scope.params.telephoneNumber = $state.params.number
        ? $state.params.number.substring(0, 11)
        : $state.params.number

      // Limpando taxas
      // $scope.clearTax();

      if (!!$scope.params.clientId && !$scope.params.telephoneNumber) {
        initializeWithClientId()
      } else if ($scope.params.telephoneNumber) {
        initializeWithPhoneNumber()
      } else {
        $state.go($state.current.name, { id: undefined, number: undefined }, { notify: false })
      }
    }
    ;(function() {
      // ToolbarService.unshift({
      //     label: 'Adicionar telefone ao pedido',
      //     enabled: true,
      //     hidden: false,
      //     icon: 'call',
      //     click: function () {
      //         $mdDialog.show({
      //             templateUrl: 'views/order/add-number-dialog.html', scope: $scope,
      //             preserveScope: true, clickOutsideToClose: true, controller: AddNumberToOrderController
      //         });
      //     }
      // });
    })()

    /**
     * Marca um endereço como selecionado
     * Ligado através da view
     * @param address Endereço
     */
    $scope.chooseAddress = function(address) {
      delete $scope.addresses
      $scope.order.address = address
      $scope.calculateTax(address)

      /**
       * Ao escolher um endereço, devemos selecionar o telefone que ligou para o
       * serviço (caso haja) para usar na hora de criar um pedido.
       */
      $scope.order.telephone = $scope.order.address.client.telephones.find(function(telephone) {
        return telephone.number === $scope.params.telephoneNumber
      })

      $state.go($state.current.name, { id: address.client.clientId }, { notify: false })
    }

    /**
     * Remove client (address) from the order,
     * enabling the address search feature.
     * Ligado através da view
     */
    $scope.removeClientFromOrder = function() {
      if ($scope.order.address) {
        $scope.view.innerContent = false

        // Limpando query de busca
        delete $scope.search.query

        // Operações para remoçao da taxa
        $scope.order.total -= $scope.order.deliveryTax
        $scope.order.deliveryTax = 0
        delete $scope.order.tax

        // Removendo endereço
        delete $scope.order.address

        // Atualizaçao do troco e taxa
        $scope.order.updateChange()
        $scope.clearTax()

        // Limpando parâmetros
        $scope.params = {}
        $state.go($state.current.name, { id: undefined, number: undefined }, { notify: false })
      }
    }

    /**
     * Mostra os endereços de um cliente,
     * encontrado atraves da busca por clientId
     * @param client Client
     */
    $scope.displayAddressesFromClient = function(client) {
      if (typeof client === 'object') {
        $scope.view.innerContent = client.addresses.length <= 3

        // Removendo addresses para inserir client
        $scope.addresses = client.addresses
        $scope.addresses.forEach(function(address) {
          address.client = client
        })
        delete client.addresses

        if ($scope.addresses.length == 1) {
          $scope.displayAddress($scope.addresses[0])
        }
      }
    }

    /**
     * Mostra os endereços de um cliente,
     * encontrado atraves da busca por número de telefone
     * @param telephones Array de telefones
     */
    $scope.displayAddressFromTelephones = function(telephones) {
      $scope.addresses = []
      telephones.forEach(function(telephone) {
        if (!telephone.client) return

        $scope.addresses = $scope.addresses.concat(telephone.client.addresses)
        telephone.client.addresses.forEach(function(address) {
          address.client = telephone.client
          address.client.telephones = address.client.telephones || []
          address.client.telephones.push(telephone)

          delete telephone.client.addresses
        })

        if ($scope.addresses.length == 1) {
          $scope.displayAddress($scope.addresses[0])
        } else {
          $scope.view.innerContent = $scope.addresses.length <= 3
        }
      })
    }

    /**
     * Seleciona um endereço para o pedido
     * @param address
     */
    $scope.displayAddress = function(address) {
      $scope.view.innerContent = !!address
      $scope.order.address = address
      $scope.numberNotFound = false

      $scope.calculateTax(address)

      delete $scope.addresses
    }

    /**
     * Criar novo contato a partir de número desconhecido
     */
    $scope.newClient = function() {
      $mdDialog.show({
        templateUrl: 'views/client/add-address.html',
        scope: $scope,
        preserveScope: true,
        controller: NewClientController,
      })
    }

    /**
     * Associar número à um contato já existente
     */
    $scope.existingClient = function() {
      $mdDialog.show({
        templateUrl: 'views/order/search-client-dialog.html',
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true,
        controller($scope) {
          $scope.searchClient = function() {
            $scope.clients = Client.find(
              {
                filter: {
                  include: ['addresses', 'telephones'],
                  order: 'name',
                },
              },
              function(clients) {
                $scope.clients = clients
              },
            )
          }
          ;(function() {
            $scope.searchClient()
          })()
        },
      })
    }

    /**
     * Associate an unkown number to a client
     * @param client
     */
    $scope.associateTo = function(client) {
      console.log(client)
    }

    /**
     * Exibe os detalhes de um contato selecionado
     */
    $scope.details = function() {
      const alert = $mdDialog.confirm()
      alert.title('Aviso')
      alert.textContent('O pedido não foi concluído. Deseja sair mesmo assim?')
      alert.ok('Ir para detalhes')
      alert.cancel('Voltar')
      $mdDialog.show(alert).then(function(confirm) {
        if (confirm) $state.go('details-client', { id: $scope.params.clientId })
      })
    }

    $scope.load()

    /**
     * Busca por clientes
     */
    function searchClient() {
      const query = $scope.search.query ? $scope.search.query.toLowerCase() : ''

      const findName = function(client) {
        return client.name !== null && client.name.toLowerCase().indexOf(query) == 0
      }
      const findTelephone = function(telephones) {
        return (
          telephones !== null &&
          telephones.some(function(tel) {
            return tel.number.toLowerCase().indexOf(query) == 0 || tel.number.toLowerCase().indexOf(query) == 2
          })
        )
      }
      const findAddress = function(address) {
        return (
          address !== null &&
          (checkAttribute(address, 'streetName', 'gte') ||
            checkAttribute(address, 'block', 'eq') ||
            checkAttribute(address, 'number', 'eq') ||
            checkAttribute(address, 'details', 'gte') ||
            checkAttribute(address, 'reference-point', 'gte') ||
            checkAttribute(address, 'neighborhood', 'gte'))
        )
      }
      const checkAttribute = function(attribute, field, comparison) {
        const value = attribute[field]
        return (
          value !== undefined &&
          value !== null &&
          (function() {
            const sValue = value.toString().toLowerCase()
            if (comparison === 'gte') return sValue.indexOf(query) >= 0
            if (comparison === 'eq') return sValue.indexOf(query) === 0
          })()
        )
      }

      Address.find(
        {
          filter: {
            include: {
              relation: 'clients',
              scope: { include: 'telephones' },
            },
          },
        },
        function(addresses) {
          // TODO Bring from backend
          $scope.addresses = addresses.filter(function(address) {
            if (!address.clients || address.clients.length == 0) return false

            const client = address.clients[0]
            const wasFound = findName(client) || findAddress(address) || findTelephone(client.telephones)

            if (wasFound) {
              address.client = client
              delete address.clients
            }
            return wasFound
          })

          $scope.view.innerContent = $scope.addresses.length <= 3

          // Caso o conteúdo deva ser exibido em um modal
          if (!$scope.view.innerContent) {
            $scope.search.query = ''
            $mdDialog.show({
              templateUrl: 'views/order/list-address-dialog.html',
              preserveScope: true,
              clickOutsideToClose: true,
              scope: $scope,
              controller: AddressListController,
            })
          }

          // Caso a busca retorne apenas um endereço, selecione o endereço
          if ($scope.addresses.length == 1) {
            const address = $scope.addresses[0]
            $scope.displayAddress(address)

            // Parâemtros da URL
            $scope.params.clientId = address.client.clientId
            $state.go($state.current.name, { id: address.client.clientId, number: undefined }, { notify: false })
          }

          delete $scope.search.query
        },
      )
    }

    /**
     * Inicializa o contéudo com inforamções do client,
     * obtidas através de number, na URL
     */
    function initializeWithPhoneNumber() {
      const number = $scope.params.telephoneNumber.substring(0, 11)
      const filter = {
        include: { relation: 'client', scope: { include: 'addresses' } },
        where: { number },
      }
      Telephone.find({ filter }, function(telephones) {
        if (telephones.length > 0) {
          if (telephones.length == 1) {
            $scope.order.telephone = telephones[0]
          }
          $scope.displayAddressFromTelephones(telephones)
        } else $scope.numberNotFound = true
      })
    }

    /**
     * Iniciliaza o conteúdo com informações do cliente,
     * obtidas através de clientId
     */
    function initializeWithClientId() {
      Client.find(
        {
          filter: {
            where: { clientId: $scope.params.clientId },
            include: ['addresses', 'telephones'],
          },
        },
        function(clients) {
          clients = clients.filter(function(client) {
            return client.telephones && client.addresses
          })

          if (clients.length === 1) {
            const client = clients[0]
            $scope.view.innerContent = client.addresses.length <= 3
            $scope.displayAddressesFromClient(client)
          }
        },
      )
    }
  }

  function AddressListController($scope, $mdDialog) {
    $scope.chooseAddress = function(address) {
      $mdDialog.hide()
      $scope.displayAddress(address)
    }
  }

  function NewClientController($scope, $stateParams, $mdDialog, $mdToast, $state, Client) {
    $scope.telephone = { number: $stateParams.number }
    $scope.client = {}
    $scope.address = {}

    // Show client and telephone inputs
    $scope.showAllFields = true
    $scope.prettyMode = 'Adicionar'
    $scope.dismiss = $mdDialog.hide

    $scope.add = function() {
      let { name } = $scope.client
      name = name === '' ? null : name

      const address = {
        addressId: 0,
        streetName: $scope.address.streetName,
        number: $scope.address.number,
        neighborhood: $scope.address.neighborhood,
        block: $scope.address.block,
        referencePoint: $scope.address.referencePoint,
      }
      const number = $scope.params.telephoneNumber.substring(0, 11)
      const client = {
        clientId: 0,
        name,
        addresses: [address],
        telephones: [{ telephoneId: 0, number }],
      }

      $scope.enabledAddBtn = false
      Client.createWithBounds(client, function(data) {
        $scope.enabledAddBtn = true

        client.clientId = data.client.clientId
        address.addressId = data.addresses[0].addressId

        $scope.displayAddress(data.addresses[0])

        data.client.telephones = data.telephones
        $scope.order.address.client = data.client
        $scope.params.clientId = data.client.clientId
        // Definindo número de telephone que originou o pedido.
        $scope.order.telephone = data.telephones[0]
        delete $scope.client

        const REGISTER_DONE = 'Salvo com successo.'
        toast(REGISTER_DONE)
        $scope.dismiss()
        $state.go(
          $state.current.name,
          {
            id: client.clientId,
            number: $state.params.number,
          },
          { notify: false },
        )
      })
    }

    function toast(message) {
      return $mdToast.show(
        $mdToast
          .simple()
          .position('bottom right')
          .textContent(message),
      )
    }
  }

  function AddNumberToOrderController($scope, $state, $mdDialog) {
    $scope.addNumberToTheOrder = function() {
      $scope.number = $scope.temporaryNumber
      /** @namespace $scope.temporaryNumber */
      delete $scope.temporaryNumber
      $state
        .go(
          $state.current.name,
          {
            id: undefined,
            number: $scope.number,
          },
          { notify: false },
        )
        .then(function() {
          $scope.load()
        })
      $mdDialog.hide()
    }
  }
})()
