/**
 * Created by Richard Lopes on 25/12/2015.
 */

const app = angular.module('app')
app.factory('ToolbarService', ToolbarService)

function ToolbarService() {
  const context = this
  const items = []

  context.source = function(array) {
    if (array) {
      items.splice(0, items.length)
      items.push.apply(items, array)
    }
    return items
  }

  context.push = function(item) {
    items.push(item)
  }
  context.unshift = function(item) {
    items.unshift(item)
  }

  context.reset = function() {
    context.source([])
  }

  return context
}
