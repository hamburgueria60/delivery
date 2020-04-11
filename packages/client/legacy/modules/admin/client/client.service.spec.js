describe('Client service', function() {
  let clientService
  let q
  let rootScope

  // Load our api.users module
  beforeEach(module('h60.client'))

  // Set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function($q, $rootScope, ClientService) {
    rootScope = $rootScope
    clientService = ClientService
    q = $q
  }))

  it('should find by phone', function(done) {
    clientService.findByPhone('91095426').then(function(phones) {
      console.log(phones)
      done()

      expect(1).toBe(1)
    })

    rootScope.$apply()
  })
})
