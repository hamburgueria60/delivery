export default function config($mdThemingProvider, routerProvider, $mdIconProvider) {
  routerProvider.initialize()

  // adding custom icons
  $mdIconProvider.icon('eye', 'icons/ic_eye.svg')
  $mdIconProvider.icon('eye_denied', 'icons/ic_eye_denied.svg')
  $mdIconProvider.icon('write', 'icons/ic_write.svg')
  $mdIconProvider.icon('takeout', 'icons/ic_takeout.svg')

  $mdThemingProvider
    .theme('default')
    .primaryPalette('orange')
    .accentPalette('indigo')
    .backgroundPalette('grey')
}
