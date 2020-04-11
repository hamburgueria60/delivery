import angular from 'infrastructure/wrapper/angular'
import restaurantDashboard from './Dashboard/components/Dashboard'

export default angular
  .module('h60.restaurant', [])
  .directive(restaurantDashboard)
  .instance().name
