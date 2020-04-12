import 'reset-css'
import 'angular-material/angular-material.css'
import '~/styles/font.css'

import angular from 'angular'
import animate from 'angular-animate'
import aria from 'angular-aria'
import material from 'angular-material'
import messages from 'angular-messages'

import theme from './config/theme'
import login from './pages/login'
import apiService from './services/api/api.service'
import colorService from './services/colors.service'

angular.module('app', [material, animate, aria, messages, theme, colorService, login, apiService])

angular.bootstrap(document.querySelector('#root'), ['app'])
