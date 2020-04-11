import angular from 'infrastructure/wrapper/angular'
import settingsPage from './components/Page'

export default angular
  .module('h60.settings', ['ngMaterial'])
  .directive(settingsPage)
  .instance().name
