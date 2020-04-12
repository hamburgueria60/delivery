import uirouter from '@uirouter/angularjs'
import angular from 'angular'

import background from '~/pages/background'
import login from '~/pages/login'
import lazyLoad from '~/services/lazy-load'
import { html } from '~/utils/html'

export default angular
  .module('app.router', [uirouter, background, login])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/')

    $stateProvider.state('root', {
      url: '/',
      template: html`<redirect></redirect>`,
    })

    $stateProvider.state('root.login', {
      url: 'login',
      template: html`<login></login>`,
    })

    $stateProvider.state('root.panel', {
      template: html`<panel></panel>`,
    })

    $stateProvider.state('root.panel.home', {
      url: 'home',
      template: html`<home></home>`,
      ...lazyLoad(() => import('~/pages/home')),
    })
  }).name
