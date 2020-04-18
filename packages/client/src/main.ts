import './styles/index.scss'
import 'focus-visible'

import * as Sentry from '@sentry/browser'
import PortalVue from 'portal-vue'
import RelativeTimeFormat from 'relative-time-format'
import ptBR from 'relative-time-format/locale/pt.json'
import VTooltip from 'v-tooltip'
import Vue, { VNode } from 'vue'
import VueApollo from 'vue-apollo'
import { MdCard, MdDialog, MdDivider, MdRadio } from 'vue-material/dist/components'

import apolloProvider from './api/apolloProvider'
import App from './App.vue'
import Locale from './components/intl'
import ExtensionListener from './events/ExtensionListener'
import Router from './plugins/Router'
import router from './router'
import store from './stores'

Sentry.init({
  environment: process.env.NODE_ENV,
  dsn: 'https://7d29659bf4eb4aa28f7af0de58312685@sentry.io/1500006',
})

// Vue.config section
Vue.config.productionTip = false

// Vue.use section
Vue.use(VueApollo)
Vue.use(VTooltip, { popover: { defaultInnerClass: '' } })
Vue.use(MdCard)
Vue.use(MdRadio)
Vue.use(MdDialog)
Vue.use(MdDivider)
Vue.use(PortalVue)
Vue.use(Router)

// Locale
RelativeTimeFormat.addLocale(ptBR)
Locale.setLocale('pt-BR')

// init
new Vue({
  apolloProvider,
  router,
  store,
  render: (h: Function): VNode => h(App),
}).$mount('#app')

ExtensionListener.listen()
