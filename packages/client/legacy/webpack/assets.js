const isNotProduction = process.env.NODE_ENV !== 'production'

const CSS = [
  { path: 'angular-material/angular-material' },
  { path: '../external/css-spaces/spaces' },
  { path: 'material-colors/dist/colors', withoutMinified: true },
]

const JS_FROM_NODE_MODULES = [
  { path: 'jquery/dist/jquery' },
  { path: 'angular/angular', withoutMinified: true },
  { path: 'angular-animate/angular-animate' },
  { path: 'angular-aria/angular-aria' },
  { path: 'angular-messages/angular-messages' },
  { path: 'angular-material/angular-material' },
  { path: 'angular-resource/angular-resource' },
  { path: '../external/angular-autodisable/angular-autodisable' },
  { path: 'angular-local-storage/dist/angular-local-storage' },
  { path: 'angular-br-filters/release/angular-br-filters' },
  { path: 'moment/moment', minifiedPath: 'moment/min/moment.min' },
  { path: 'underscore/underscore', minifiedPath: 'underscore/underscore-min' },
  { path: 'angular-moment/angular-moment' },
].map(module => {
  return { ...module, withoutMinified: isNotProduction }
})

const JS_MISSING_MINIFIED = [
  { path: 'string-mask/src/string-mask', withoutMinified: true },
  { path: 'angular-i18n/angular-locale_pt-br', withoutMinified: true },
  { path: '../external/socket.io-client/socket.io', withoutMinified: true },
  {
    path: '../external/angular-input-masks-standalone/angular-input-masks-standalone',
    withoutMinified: true,
  },
]

module.exports = {
  JS: JS_FROM_NODE_MODULES.concat(JS_MISSING_MINIFIED),
  CSS,
}
