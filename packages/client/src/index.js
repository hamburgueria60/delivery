import 'angular-material/angular-material.css'
import 'reset-css'

import angular from 'angular'
import animate from 'angular-animate'
import aria from 'angular-aria'
import material from 'angular-material'
import messages from 'angular-messages'

import theme from './config/theme'
import login from './pages/login'
import colorService from './services/colors.service'

angular.module('app', [material, animate, aria, messages, theme, colorService, login])

angular.bootstrap(document.querySelector('#root'), ['app'])
