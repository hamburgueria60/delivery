/**
 * Created by Richard on 27/02/2016.
 */
;(function ValidationServiceWrapper() {
  const app = angular.module('app')

  // TODO remove this by using a factory rather than a service
  const context = { rules: [] }

  app.service('ValidationService', function ValidationService() {
    const service = {}
    const REQUIRED = 1
    const WARNING = 2

    const set = (message, fn) => {
      const mService = {}
      context.rules = context.rules || []
      mService.message = message
      mService.validationRule = fn
      context.rules.push(mService)
      return mService
    }

    service.warn = (message, fn) => {
      const mService = set(message, fn)
      mService.type = WARNING
    }

    service.require = (message, fn) => {
      const mService = set(message, fn)
      mService.type = REQUIRED
    }

    service.validate = () => {
      const failedRules = []
      const failedWarningRules = []
      const failedRequiredRules = []

      context.rules.forEach(rule => {
        if (rule.validationRule()) {
          failedRules.push(rule)
          if (rule.type === WARNING) failedWarningRules.push(rule)
          else if (rule.type === REQUIRED) failedRequiredRules.push(rule)
        }
      })

      context.rules = []

      return {
        validated: failedRequiredRules.length === 0,
        hasWarning: failedWarningRules.length > 0,
        failedRules,
      }
    }

    return service
  })
})()
