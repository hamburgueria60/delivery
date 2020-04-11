/**
 * Created by Richard Lopes on 27/12/2015.
 */

const app = angular.module('app')
app.factory('ScrollService', ScrollService)
app.directive('scroll', ScrollDirective)

function ScrollService() {
  const context = this

  function addToQuantity(id, amount) {
    const item = context.mapOfSelectedItems[id]
    if (item) {
      item.quantity = item.quantity || 0
      item.quantity += amount
      item.total = item.quantity * item.price
      return item.quantity
    }
  }

  context.addToOrder = function(item) {
    context.mapOfSelectedItems[item.itemId] = item
    addToQuantity(item.itemId, 1)
  }

  context.removeItemFromOrder = function(event, item) {
    // event.stopPropagation(); event.preventDefault();
    const quantity = addToQuantity(item.itemId, -1)
    if (quantity <= 0 && item.itemId in context.mapOfSelectedItems) delete context.mapOfSelectedItems[item.itemId]
  }

  return context
}

function ScrollDirective() {
  function startsWith(string, prefix) {
    return string.toLowerCase().indexOf(prefix.toLowerCase()) !== -1
  }

  return {
    controller($scope, ScrollService) {
      $scope.service = ScrollService
      // TODO Assign mapOfSelectedItems as an attribute instead of using it from $scope
      if (!!$scope.order && !!$scope.order.mapOfSelectedItems)
        ScrollService.mapOfSelectedItems = $scope.order.mapOfSelectedItems
    },
    link(scope, element, attrs) {
      scope.mapOfSelectedItems = scope[attrs.map]

      element.scrollTop(0)
      element.hover(function() {
        element.find('.selected').removeClass('selected')
      })

      // watching changes on query
      scope.$watch(attrs.scroll, function(query, old) {
        if (!!query && query.length > 0) {
          if (scope[attrs.src]) {
            let indexFound = -1
            let notFound = true

            // matching query with item.name
            scope[attrs.src].every(function(item, index) {
              if (startsWith(item.name, query)) {
                indexFound = index
                notFound = false
              }
              return notFound
            })

            // apply selected hover to item found
            if (indexFound >= 0 && query.toString() !== old.toString()) {
              const item = element.find('md-list-item').eq(indexFound)
              element.find('.selected').removeClass('selected')
              if (scope.searchItemFound) scope.searchItemFound.selected = false

              // scrolls to the item
              element.scrollTop(0).scrollTop(item.position().top)
              item.addClass('selected')
              scope.searchItemFound = scope[attrs.src][indexFound]
            }
          }
        } else {
          // remove selected hover when query is empty
          delete scope.searchItemFound
          element.find('.selected').removeClass('selected')
        }
      })
    },
  }
}
