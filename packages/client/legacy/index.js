import './sass/index.scss'

import 'infrastructure/services/mobx'
import 'infrastructure/services/sentry.io'
import 'infrastructure/services/stream'
import 'infrastructure/vendors'

import angular from 'infrastructure/wrapper/angular'
import config from 'infrastructure/bootstrap/config'
import run from 'infrastructure/bootstrap/run'

import '@uirouter/angularjs'

import ApplicationService from 'infrastructure/services/ApplicationServices'
import H60Layout from 'features/Layout'
import H60Restaurant from 'features/Restaurant'
import H60Settings from 'features/Settings'

angular
  .module('app', [
    'angularMoment',
    'h60.client',
    'h60.components.find-address',
    'h60.components',
    'h60.order',
    'idf.br-filters',
    'lbServices',
    'LocalStorageModule',
    'ngAria',
    'ngAutodisable',
    'ngLocale',
    'ngMaterial',
    'ngMessages',
    'react',
    'ui.router',
    'ui.unique.filter',
    'ui.utils.masks',
    H60Layout,
    H60Restaurant,
    H60Settings,
  ])
  .config(config)
  .run(run)
  .service(ApplicationService)
