/**
 * Created by Richard Lopes on 31/12/2015.
 */

const app = angular.module('app')
app.factory('FormatService', FormatService)

function FormatService() {
  return {
    format() {
      if (arguments.length > 0) {
        let i = 0
        let mMask = arguments[0]
        const args = Array.prototype.slice.call(arguments).slice(1, arguments.length)
        mMask.match(/\{(\w+)\}/g).forEach(function(element) {
          mMask = mMask.replace(element, i < args.length ? args[i] : '')
          i++
        })
        return angular.copy(mMask)
      }
    },
  }
}
