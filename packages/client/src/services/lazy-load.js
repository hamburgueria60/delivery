export default (getModule) => {
  return {
    lazyLoad: async ($transition$) => {
      const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad')
      const home = await getModule()
      $ocLazyLoad.load(home.default)
    },
  }
}
