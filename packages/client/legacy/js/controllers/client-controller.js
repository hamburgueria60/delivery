/**
 * Created by Richard Lopes on 27/12/2015.
 */

;(function() {
  const app = angular.module('app')
  app.controller('ListClientController', ListClientController)
  app.controller('AddEditClientController', AddEditClientController)
  app.controller('DetailsClientController', DetailsClientController)

  const relations = ['addresses', 'telephones']

  function EventEmitter() {
    const callbacks = {}

    this.emit = function(key, args) {
      if (key in callbacks) {
        callbacks[key].forEach(function(callback) {
          callback(args)
        })
      }
    }

    this.on = function(key, cb) {
      if (!(key in callbacks)) callbacks[key] = []
      callbacks[key].push(cb)
    }

    this.off = function(key) {
      delete callbacks[key]
    }
  }

  // TODO Pagination
  function find(Client, filter, success, error) {
    return Client.find(
      {
        filter: angular.extend(defaultClientInclude, filter),
      },
      success,
      error,
    )
  }

  const defaultClientInclude = { include: relations }

  function SearchDialogController($scope, $state, $stateParams, $mdDialog) {
    $scope.query = $stateParams.query ? $stateParams.query : ''
    $scope.option = $stateParams.option ? $stateParams.option : $scope.options[0].value

    $scope.dismiss = function() {
      $scope.query = ''
      $mdDialog.hide()
    }
    $scope.search = function() {
      $state.go('search-client', {
        option: $scope.option,
        query: $scope.query,
      })
    }
  }

  function ListClientController($scope, $state, $stateParams, $mdDialog, ToolbarService, Client) {
    $scope.list = []
    $scope.options = [
      {
        label: 'Nome',
        value: 'name',
      },
      {
        label: 'Endereço',
        value: 'address',
      },
      {
        label: 'Telephone',
        value: 'telephone',
      },
    ]
    $scope.details = function(client) {
      $state.go('details-client', { id: client.clientId })
    }

    function main() {
      const toolbar = []
      toolbar.push({
        label: 'Buscar cliente',
        icon: 'search',
        click() {
          $mdDialog.show({
            templateUrl: 'views/client/search-dialog.html',
            scope: $scope,
            preserveScope: true,
            controller: SearchDialogController,
          })
        },
      })

      if ($stateParams.search) {
        $scope.mOption = angular.copy($stateParams.option)
        $scope.mQuery = angular.copy($stateParams.query)

        let nameWhere
        let addressWhere
        let telephonesWhere
        if ($scope.mQuery && $scope.mQuery !== '') {
          if ($scope.mOption === 'name') {
            nameWhere = { name: { like: `%${$scope.mQuery}%` } }
          } else if ($scope.mOption === 'address') {
            addressWhere = {
              or: [
                { streetName: { like: `%${$scope.mQuery}%` } },
                { number: { like: `%${$scope.mQuery}%` } },
                { details: { like: `%${$scope.mQuery}%` } },
                { neighborhood: { like: `%${$scope.mQuery}%` } },
              ],
            }
          } else if ($scope.mOption === 'telephone') {
            telephonesWhere = { number: { like: `%${$scope.mQuery}%` } }
          }
        }

        Client.find(
          {
            filter: {
              include: [
                { relation: 'addresses', scope: { where: addressWhere } },
                { relation: 'telephones', scope: { where: telephonesWhere } },
              ],
              where: nameWhere,
            },
          },
          function(clients) {
            console.log(clients)
            $scope.list = clients.filter(function(client) {
              return client.addresses.length > 0 && client.telephones.length > 0
            })
          },
        )
      } else {
        find(Client, {}, function(clients) {
          $scope.list = clients
        })

        toolbar.push({
          label: 'Adicionar cliente',
          icon: 'add',
          click() {
            $state.go('add-client')
          },
        })
      }

      ToolbarService.source(toolbar)
    }

    main()
  }

  function AddEditClientController(
    $scope,
    $state,
    $stateParams,
    $mdDialog,
    $mdToast,
    ToolbarService,
    FormatService,
    MessageService,
    Client,
  ) {
    const addressTemplate = 'views/client/add-address.html'
    const telephoneTemplate = 'views/client/add-telephone.html'

    const modes = ($scope.modes = { add: 'Adicionar', edit: 'Editar' })
    const registerDone = { add: 'Cadastrado com sucesso.', edit: 'Atualizado com sucesso.' }
    const numberAlreadyRegistered = 'Número já associado a um cliente.'

    $scope.helpContent = MessageService.switchCreateAnother
    $scope.mode = currentStateIs('edit') ? 'edit' : 'add'
    $scope.prettyMode = $scope.mode in modes ? modes[$scope.mode] : ''
    $scope.data = {}

    $scope.save = function() {
      $scope.clientForm.$setSubmitted()

      if (!$scope.clientForm.$invalid && isValid()) {
        const data = _.omit($scope.client, '$error')
        $scope.enabledAddBtn = false
        Client.upsertWithRelations(
          data,
          function() {
            $scope.enabledAddBtn = true
            toast(registerDone[$scope.mode])
            $state.go('clients')
          },
          function(err) {
            try {
              const { message } = err.data.error
              const { model } = err.data.error

              toast('Houve um erro na validação dos dados. Verifque o formulário.')

              if (message.indexOf('ER_DUP_ENTRY') >= 0) {
                const mask = /ER_DUP_ENTRY: Duplicate entry '(\w+)' for key '(\w+)'/
                const match = mask.exec(message)
                const key = match[2]
                const value = match[1]

                if (model === 'Telephone') {
                  let telephone
                  $scope.client.telephones.some(function(item) {
                    const thisTelephone = item[key] == value
                    if (thisTelephone) telephone = item
                    return thisTelephone
                  })

                  if (telephone) telephone.invalid = numberAlreadyRegistered
                } else {
                  console.log(err)
                }
              }
            } catch (e) {
              console.log(e)
            }
          },
        )
      }
    }
    $scope.openAddAddress = function(data) {
      $mdDialog.show({
        templateUrl: addressTemplate,
        scope: $scope,
        preserveScope: true,
        controller: AddressDialogController,
        locals: { address: data },
      })
    }
    $scope.openAddTelephone = function(data) {
      $mdDialog.show({
        templateUrl: telephoneTemplate,
        scope: $scope,
        preserveScope: true,
        controller: TelephoneDialogController,
        locals: { telephone: data },
      })
    }
    $scope.remove = function(type, item, list) {
      const entity = type === 'address' ? 'endereço' : 'telefone'
      if (list.length - 1 === 0) {
        // validity checking
        const cannotRemove = 'É necessário pelo menos um {0} associado.'
        toast(FormatService.format(cannotRemove, entity))
      } else {
        const index = list.indexOf(item)
        list.splice(index, 1)
      }
    }
    $scope.removeClient = function(event) {
      if ($stateParams.id) {
        const removeClient = 'Remover cliente'
        const confirmRemoval = 'Você confirma a remoção *permanente* de {0}?'
        const removeAction = 'Remover'
        const cancelAction = 'Cancelar'
        const dialog = $mdDialog.confirm()

        dialog.title(removeClient)
        dialog.textContent(FormatService.format(confirmRemoval, $scope.client.name))
        dialog.targetEvent(event)
        dialog.ok(removeAction).cancel(cancelAction)

        $mdDialog.show(dialog).then(function() {
          Client.removeById({ id: $stateParams.id }, function(result) {
            console.log(result)
            $state.go('clients', {}, { reload: true })
          })
        })
      }
    }
    $scope.editAddress = function(address) {
      $scope.openAddAddress(address)
    }
    $scope.editTelephone = function(telephone) {
      $scope.openAddTelephone(telephone)
    }

    function toast(message) {
      return $mdToast.show(
        $mdToast
          .simple()
          .position('bottom right')
          .textContent(message)
          .action('OK'),
      )
    }

    function currentStateIs(name) {
      return $state.current.name.indexOf(name) !== -1
    }

    function isValid() {
      let cb
      let error
      const messages = {
        address: 'Adicione pelo menos 1 endereço.',
        telephone: 'Adicione pelo menos 1 telefone.',
      }
      if ($scope.client.addresses.length === 0) {
        cb = $scope.openAddAddress
        error = 'address'
      } else if ($scope.client.telephones.length === 0) {
        cb = $scope.openAddTelephone
        error = 'telephone'
      } else return true

      const toast = $mdToast
        .simple()
        .textContent(messages[error])
        .action('Corrigir agora')
        .highlightAction(true)
        .position('bottom right')

      $mdToast.show(toast).then(function(response) {
        if (response == 'ok') cb()
      })
    }

    function initializeToolbar() {
      ToolbarService.reset()
      const saveBtn = {
        label: 'Salvar',
        icon: 'done',
        click: $scope.save,
      }
      const addBtn = {
        label: 'Adicionar endereço',
        icon: 'location_on',
        click: $scope.openAddAddress,
      }
      const callBtn = {
        label: 'Adicionar telefone',
        icon: 'call',
        click: $scope.openAddTelephone,
      }
      const deleteBtn = {
        icon: 'delete',
        label: 'Remover cliente',
        click: $scope.removeClient,
      }
      const dividerBtn = {
        divider: true,
      }

      const toolbar = []

      if (currentStateIs('edit')) {
        toolbar.push(deleteBtn)
        toolbar.push(dividerBtn)
      }

      toolbar.push(addBtn)
      toolbar.push(callBtn)
      toolbar.push(dividerBtn)
      toolbar.push(saveBtn)

      ToolbarService.source(toolbar)
    }

    function AddressDialogController($scope, address) {
      genericDialogController($scope, 'address', 'addresses', address)
    }

    function TelephoneDialogController($scope, telephone) {
      genericDialogController($scope, 'telephone', 'telephones', telephone)
    }

    function genericDialogController($scope, keyObject, keyArray, object) {
      $scope[keyObject] = object ? angular.copy(object) : {}
      $scope.createAnother = false

      const keys = _.keys($scope[keyObject])
      if (keys.length === 0) {
        $scope.prettyMode = $scope.modes.add
      } else {
        $scope.prettyMode = $scope.modes.edit
      }

      $scope.add = function() {
        delete $scope[keyObject].invalid

        if (keyObject === 'telephone') {
          const exists = $scope.client[keyArray].some(function(item) {
            return item.number === $scope[keyObject].number
          })
          if (exists) {
            toast(numberAlreadyRegistered)
            $scope[keyObject].number = ''
            return
          }
        }

        if (object) {
          // editing
          $scope[keyObject] = angular.extend(object, $scope[keyObject])
        } else {
          $scope.client[keyArray].push($scope[keyObject])
          $scope[keyObject][`${keyObject}Id`] = 0
        }

        $scope[`${keyObject}Form`].$setPristine()
        $scope[`${keyObject}Form`].$setUntouched()
        $scope[keyObject] = {}
        if (!$scope.createAnother) {
          $mdDialog.hide()
        }
      }

      $scope.dismiss = function() {
        $scope.address = {}
        $mdDialog.hide()
      }
    }

    function main() {
      initializeToolbar()
      app.controller('AddressDialogController', AddressDialogController)
      app.controller('TelephoneDialogController', TelephoneDialogController)

      // assigning client variable when adding or editing mode.
      if (currentStateIs('add')) {
        $scope.client = {
          clientId: 0,
          addresses: [],
          telephones: [],
          $error: false,
          $resolved: true,
        }
      } else if (currentStateIs('edit') && $stateParams.id) {
        $scope.client = Client.findOne(
          {
            filter: {
              where: { clientId: $stateParams.id },
              include: ['addresses', 'telephones'],
            },
          },
          function() {
            $scope.client.$error = false
            // $scope.oldClient = angular.copy($scope.client);
          },
          function() {
            $scope.client.$error = true
          },
        )
      }
    }

    main()
  }

  function DetailsClientController($scope, $state, ToolbarService, Client) {
    /**
     * Provides content to the view
     */
    function content() {
      $scope.client = Client.findOne({
        filter: {
          include: relations,
          where: { clientId: $state.params.id },
        },
      })
    }

    function main() {
      content()

      const toolbar = []
      toolbar.push({
        label: 'Editar dados do cliente',
        icon: 'edit',
        click() {
          $state.go('edit-client', { id: $state.params.id })
        },
      })
      toolbar.push({
        label: 'Fazer pedido para o cliente',
        icon: 'assignment',
        click() {
          $state.go('add-order', { id: $state.params.id })
        },
      })
      ToolbarService.source(toolbar)
    }

    main()
  }
})()
