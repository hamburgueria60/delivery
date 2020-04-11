import angular from 'infrastructure/wrapper/angular'
import LeftNav from './LeftNav'

export default angular
  .module('h60.layout', [])
  .directive(LeftNav)
  .instance().name
