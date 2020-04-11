import angular from 'angular'

function AngularWrapper() {}

AngularWrapper.prototype.module = function module(...args) {
  const wrapper = new AngularWrapper()
  wrapper.angularInstance = angular.module(...args)
  return wrapper
}

AngularWrapper.prototype.instance = function instance() {
  return this.angularInstance
}
;['config', 'run'].forEach(entity => {
  // eslint-disable-next-line func-names
  AngularWrapper.prototype[entity] = function(...args) {
    this.angularInstance[entity](...args)
    return this
  }

  Object.defineProperty(AngularWrapper.prototype[entity], entity, {
    value: AngularWrapper.prototype[entity],
    writable: false,
  })
})
;['service', 'controller', 'directive', 'factory'].forEach(entity => {
  // eslint-disable-next-line func-names
  AngularWrapper.prototype[entity] = function(Entity) {
    this.angularInstance[entity](Entity.displayName, Entity)
    return this
  }

  Object.defineProperty(AngularWrapper.prototype[entity], entity, {
    value: AngularWrapper.prototype[entity],
    writable: false,
  })
})

export default new AngularWrapper()
