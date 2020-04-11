angular.module('h60.order').service('OrderService', [
  '$q',
  'Order',
  'DeliveryTax',
  'ItemService',
  'ValidationService',
  'ToastService',

  function OrderService($q, Order, DeliveryTax, ItemService, ValidationService, ToastService) {
    const context = this

    // TAKEOUT | DELIVERY
    this.type = ''

    this.setType = type => {
      this.type = type
    }

    this.Order = function OrderModel() {
      // constantes
      const SELECTED_ITEMS_VIEW = 0
      const ALL_ITEMS_VIEW = 1
      const NO_ITEM_SELECTED = 'Não há itens selecionados para este pedido.'

      // contexto
      const order = this

      // métodos públicos
      order.add = add
      order.reset = reset
      order.remove = remove
      order.validate = validate
      order.finish = finish
      order.adjustAmount = adjustAmount
      order.toggleVisibility = toggleVisibility
      order.attachAddress = attachAddress
      order.detachAddress = detachAddress
      order.attachPhone = attachPhone

      order.isSendind = false
      order.search = new ItemService.SearchService()
      order.address = null

      order.visibilityStatus = ALL_ITEMS_VIEW

      order._items = ItemService.all() // todos os itens

      order.items = {} // key: itemId, value: item, itens selecionados
      order.paidAmount = 0
      order.total = 0
      order.telephone = null

      order.deliveryAddress = null
      order.deliveryTax = null

      // valor antigo da taxa, antes das mudanças
      let _deliveryTax = null
      // order.deliveryTax.value
      Object.defineProperty(order, 'deliveryTax', {
        get() {
          return _deliveryTax
        },
        set(newValue) {
          order.total -= _deliveryTax || 0
          order.total += newValue
          _deliveryTax = newValue
        },
      })

      // order.paybackAmount
      Object.defineProperty(order, 'paybackAmount', {
        get() {
          return order.paidAmount - order.total
        },
      })

      /**
       * Adiciona um item na lista de itens selecionados para o pedido
       * @param item {*} Item a ser inserido
       * @param options
       *      showDetailsAction: Opcionalmente, exibir a ação de detalhes do item ao adicionar.
       * @returns {*|Promise}
       */
      function add(item, options) {
        options = options || {}

        const items = (order.items = order.items || {})
        const itemId = item.itemId.toString()

        if (!items.hasOwnProperty(itemId)) items[itemId] = item
        else item = order.items[item.itemId]

        order.total = (order.total || 0) + item.amount() // total
        order.paidAmount = order.paidAmount || 0 // valor pago

        item.details = ''
        item.quantity += 1
        item.total = item.quantity * item.price

        if (options.showDetailsAction) item.showDetailsAction = item.quantity > 0
        else item.showDetailsAction = false

        return $q.when(order.items)
      }

      /**
       * Remove todos os itens do pedido
       */
      function reset() {
        Object.keys(order.items).forEach(function(key) {
          order.items[key].quantity = 0
          order.items[key].total = 0
          order.items[key].details = ''
          delete order.items[key]
        })
        order.total = order.deliveryTax
        order.search.query = ''
        toggleVisibility({ strict: true })
        return $q.when(order.items)
      }

      /**
       * Define o valor de acréscimo ou desconto para um item
       * @param options
       *      itemId - id do item,
       *      addition|discount - valor em acrédismo ou desconto
       */
      function adjustAmount(options) {
        let old

        options = options || {}

        if (options.addition) {
          old = order.items[options.itemId].addition
          order.items[options.itemId].addition = options.addition
          order.total -= old
          order.total += options.addition
        }
        if (options.discount) {
          old = order.items[options.itemId].discount
          order.items[options.itemId].discount = options.discount
          order.total += old
          order.total -= options.discount
        }
      }

      /**
       * Remove um item selecionado, da lista de itens selecionados para o pedido.
       * @param itemId {Number} id do item a ser removido
       */
      function remove(itemId) {
        const item = order.items[itemId]

        if (typeof itemId !== 'number') throw new TypeError(`Expected number insted of ${typeof itemId}`)

        if (item) {
          item.quantity--
          item.total -= item.price
          item.showDetailsAction = item.quantity > 0
          order.total -= item.amount({ unit: true })

          if (item.quantity === 0) {
            item.details = ''
            item.addition = 0
            item.discount = 0
            delete order.items[itemId]
          }
        }

        return $q.when(order.items)
      }

      /**
       * Valida o pedido quanto a: existência de itens, valor pago maior que zero, sem endereço e
       * valor pago maior do que o valor do pedido
       * @returns {*}
       */
      function validate() {
        const WITHOUT_SELECTED_ITEMS = 'Você precisa selecionar pelo menos um item para o pedido.'
        const ZERO_PAID_VALUE = 'Você precisa informar quanto o valor pago pelo cliente.'
        const NO_ADDRESS_SELECTED = 'Você precisa definir o endereço para entrega.'
        const PAID_VALUE_NOT_ENOUGH = 'O valor pago pelo cliente não é suficiente para quitar o pedido.'
        const INVALID_TAX = 'O endereço selecionado não possui taxa de entrega.'

        const validation = ValidationService

        if (context.type !== 'TAKEOUT') {
          validation.require(NO_ADDRESS_SELECTED, () => {
            return !order.address
          })
          validation.require(INVALID_TAX, () => {
            return order.deliveryTax === null
          })
        }

        validation.require(WITHOUT_SELECTED_ITEMS, () => {
          return Object.keys(order.items).length == 0
        })
        validation.require(ZERO_PAID_VALUE, () => {
          return order.paidAmount === 0
        })
        validation.require(PAID_VALUE_NOT_ENOUGH, () => {
          return order.paidAmount < order.total
        })

        return validation.validate()
      }

      /**
       * Finaliza o pedido, cadastrando-o no servidor
       * @returns {Promise}
       */
      function finish() {
        const items = Object.keys(order.items).map(function(itemKey) {
          return {
            itemId: order.items[itemKey].itemId,
            quantity: order.items[itemKey].quantity,
            price: order.items[itemKey].price,
            details: order.items[itemKey].details,
            amount: order.items[itemKey].price * order.items[itemKey].quantity,
            discount: order.items[itemKey].discount,
            addition: order.items[itemKey].addition,
          }
        })

        const result = order.validate()
        if (!result.validated || result.hasWarning) {
          if (!result.validated) {
            return $q.reject(result).catch(function() {
              ToastService.toast(result.failedRules[0].message)
              return $q.reject(result)
            })
          }
        }

        return createOrder()

        function createOrder() {
          const telephoneId = order.telephone ? order.telephone.telephoneId : null

          console.log(order)

          return Order.createOrder({
            type: context.type,
            addressId: order.address ? order.address.addressId : null,
            tax: order.deliveryTax || 0,
            amount: order.total,
            paidValue: order.paidAmount,
            addition: 0, // TODO
            discount: 0, // TODO
            telephoneId,
            items,
          }).$promise
        }
      }

      /**
       * Associar um endereço ao pedido
       * @param address Endereço
       */
      function attachAddress(address) {
        order.address = address
        return updateTax()
      }

      /**
       * Associar um telefone ao pedido
       * @param phone Telefone
       */
      function attachPhone(phone) {
        order.telephone = phone
      }

      /**
       * Desassociar o endereço deste pedido
       */
      function detachAddress() {
        order.address = null
        return updateTax()
      }

      /**
       * Atualiza a taxa de pedido, em função do endereço
       */
      function updateTax() {
        if (order.address) {
          return DeliveryTax.findOne({
            filter: {
              order: 'neighborhood ASC',
              where: {
                neighborhood: { like: `%${order.address.neighborhood}` },
              },
            },
          }).$promise.then(function(tax) {
            order.deliveryTax = tax.value
          })
        }
        order.deliveryTax = null
        console.log(order)
        return $q.reject()
      }

      /**
       * Alterar entre a exibição de todos e apenas dos itens selecionados.
       * @param options stricit - alterna apenas para a visualização de todos os items do pedido
       */
      function toggleVisibility(options) {
        options = options || {}

        if (!options.strict && order.visibilityStatus == ALL_ITEMS_VIEW) {
          order.search.query = ''

          if (Object.keys(order.items).length === 0) {
            ToastService.toast(NO_ITEM_SELECTED)
          } else {
            order._items.then(function(items) {
              items.forEach(function(item) {
                item.visible = item.quantity > 0
              })
              order.visibilityStatus = SELECTED_ITEMS_VIEW
            })
          }
        } else {
          order._items.then(function(items) {
            items.forEach(function(item) {
              item.visible = true
            })
            order.visibilityStatus = ALL_ITEMS_VIEW
          })
        }
      }
    }

    this.findById = function(orderId) {
      return Order.findById({
        id: orderId,
        filter: { fields: ['addressId'] },
      }).$promise
    }
  },
])
