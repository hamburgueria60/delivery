import angular from 'angular'

import { html } from '~/utils/html'

const home = () => ({
  scope: false,
  template: html`Home (lazy loaded)`,
})

export default angular.module('app.home', []).directive('home', home)
