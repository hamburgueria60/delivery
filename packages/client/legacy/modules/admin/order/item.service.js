;(function() {
  angular.module('h60.order').service('ItemService', ItemService)

  ItemService.$inject = ['$q', 'Item']
  function ItemService($q, Item) {
    const context = this

    context.Item = ItemModel
    context.SearchService = SearchItemService
    context.all = all

    /**
     * Buscar um todos os item do cardápio
     */
    function all() {
      return Item.find({
        filter: { order: 'name' },
      })
        .$promise.then(function(items) {
          return items.map(function(item) {
            return new ItemModel(item)
          })
        })
        .then(function(items) {
          context._items = items
          return items
        })
    }

    function ItemModel(item) {
      const context = this

      item = item || {}

      for (const property in item) {
        if (item.hasOwnProperty(property)) {
          context[property] = item[property]
        }
      }

      // visibilidade do item no pedido
      context.visible = true
      // quantidade de itens
      context.quantity = item.quantity || 0
      // detalhes
      context.details = item.details || ''
      // descontos
      context.discount = item.discount || 0
      // acréscimos
      context.addition = item.addition || 0
      // Valor do item no pedido, sem considerar os acréscimos e descontos
      context.total = (item.price || 0) * context.quantity

      /**
       * @returns {number} Retorna o valor final do item no pedido,
       * incluindo descontos e acréscimos
       */
      context.amount = function(options) {
        options = options || {}
        return context.price + context.addition - context.discount
      }
    }

    function SearchItemService() {
      const context = this
      let _previous

      context.query = ''
      context.filteredItems = []
      context.afterSearch = afterSearch

      function afterSearch() {
        let first

        if (_previous) _previous = null

        if (!_previous && context.filteredItems.length > 0) {
          first = context.filteredItems[0]
          _previous = first
        }
      }
    }
  }
})()
