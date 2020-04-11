/**
 * Created by Richard Lopes on 27/12/2015.
 */

const app = angular.module('app')
app.filter('fullAddress', FullAddressFilter)

function FullAddressFilter() {
  /**
   * @params options Disabled options
   */
  return function(address, options) {
    let fullAddress = ''
    options = options || {}

    if (address) {
      const mask = '{0}{1}{2} - {3}{5}{4}'
      fullAddress = angular.copy(mask)
      fullAddress = fullAddress.replace('{0}', address.streetName)
      fullAddress = fullAddress.replace('{1}', address.number ? `, nº ${address.number}` : '')
      fullAddress = fullAddress.replace('{2}', address.block ? `, Qd. ${address.block}` : '')
      fullAddress = fullAddress.replace('{3}', address.neighborhood)
      fullAddress = fullAddress.replace('{4}', address.details ? `, *${address.details}*` : '')

      if (!hasValue(options.referencePoint) || options.referencePoint === true)
        fullAddress = fullAddress.replace('{5}', address.referencePoint ? ` (${address.referencePoint})` : '')
      else fullAddress = fullAddress.replace('{5}', '')
    }
    return fullAddress
  }

  function hasValue(target) {
    return target !== undefined && target !== null && typeof target !== 'undefined'
  }
}
