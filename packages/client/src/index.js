import 'reset-css'
import 'angular-material/angular-material.css'
import '~/styles/font.css'

import angular from 'angular'
import animate from 'angular-animate'
import aria from 'angular-aria'
import material from 'angular-material'
import messages from 'angular-messages'

import floating from './components/floating'
import panel from './components/panel'
import router from './config/router'
import theme from './config/theme'
import login from './pages/login'
import redirect from './pages/redirect'
import colors from './services/colors'

angular.module('app', [material, animate, aria, messages, theme, colors, router, floating, panel, login, redirect])

angular.bootstrap(document.querySelector('#root'), ['app'])
