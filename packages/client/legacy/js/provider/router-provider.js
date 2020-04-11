/**
 * Created by Richard Lopes on 31/01/2016.
 */

;(function() {
  const app = angular.module('app')
  app.provider('router', function($stateProvider, $urlRouterProvider) {
    return {
      initialize,
      $get: angular.noop,
    }
    function initialize() {
      const context = {}
      const mStates = {
        'home': {
          url: '/',
          templateUrl: 'views/home/home.html',
        },
        'dashboard': {
          url: '/dashboard',
          controller: 'DashboardController',
          templateUrl: 'views/dashboard/dashboard.html',
          resolve: {
            dashboard($q, $timeout, Dashboard) {
              const deferred = $q.defer()
              Dashboard.get(function(data) {
                deferred.resolve(data)
              })
              return deferred.promise
            },
          },
        },
        'add-order': {
          url: '/orders/add?id&number',
          reloadOnSearch: false,
          controller: 'OrderController',
          templateUrl: 'modules/admin/order/order-main.html',
        },
        'edit-order': {
          url: '/orders/edit/:orderId?id&number',
          controller: 'EditOrderController',
          templateUrl: 'modules/admin/order/order-main.html',
        },
        'print-order': {
          url: '/order/:id/print',
          controller: 'PrintOrderController',
          templateUrl: 'views/order/print.html',
        },
        'clients': {
          url: '/clients?page',
          controller: 'ListClientController',
          templateUrl: 'views/client/list.html',
        },
        'add-client': {
          url: '/clients/add',
          controller: 'AddEditClientController',
          templateUrl: 'views/client/add.html',
        },
        'details-client': {
          url: '/clients/:id',
          controller: 'DetailsClientController',
          templateUrl: 'views/client/details.html',
        },
        'edit-client': {
          url: '/clients/edit/:id',
          controller: 'AddEditClientController',
          templateUrl: 'views/client/add.html',
        },
        'search-client': {
          url: '/clients/search/:option/:query',
          controller: 'ListClientController',
          templateUrl: 'views/client/list.html',
          params: { search: true },
        },
        'delivery-taxes': {
          url: '/taxes',
          controller: 'DeliveryTaxesController',
          templateUrl: 'views/delivery-taxes/list.html',
        },
        'order-history': {
          url: '/orders?page',
          controller: 'OrderHistoryController',
          templateUrl: 'views/order-history/list.html',
        },
        'food-menu': {
          url: '/items',
          controller: 'FoodMenuController',
          templateUrl: 'views/food-menu/list.html',
        },
        'restaurant-dashboard': {
          url: '/restaurant/dashboard',
          templateUrl: 'features/Restaurant/Dashboard/index.html',
        },
        'settings': {
          url: '/settings',
          templateUrl: 'features/Settings/components/Page/index.html',
        },
      }
      $urlRouterProvider.otherwise('/')
      const keys = Object.keys(mStates)
      for (let i = 0; i < keys.length; i++) {
        const stateName = keys[i]
        const state = mStates[stateName]
        $stateProvider.state(stateName, state)
      }
      return context
    }
  })
})()
