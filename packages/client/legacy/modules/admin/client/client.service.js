;(function() {
  angular.module('h60.client').service('ClientService', ClientService)

  ClientService.$inject = ['$q', 'ClientAddress', 'Address', 'Client', 'Telephone', 'DeliveryTax']
  function ClientService($q, ClientAddress, Address, Client, Telephone, DeliveryTax) {
    const context = this

    this.findBy = findBy

    this.CLIENT_ID = 'CLIENT_ID'
    this.ADDRESS_ID = 'CLIENT_ID'
    this.NAME = 'NAME'
    this.ADDRESS = 'ADDRESS'
    this.PHONE = 'PHONE'
    //
    function findBy(type, query) {
      if (type === context.CLIENT_ID) {
        return findByClientId(query)
      }
      if (type === context.NAME) {
        return findByName(query)
      }
      if (type === context.ADDRESS) {
        return findByAddress(query)
      }
      if (type === context.PHONE) {
        return findByPhone(query)
      }
      if (type === context.ADDRESS_ID) {
        return findByAddressId(query)
      }
      return $q.reject()
    }

    function findByAddressId(query) {
      if (query) {
        return Address.findOne({
          filter: {
            include: { clients: ['telephones'] },
            where: { addressId: query },
          },
        }).$promise
      }
      throw new Error('Query is not defined')
    }

    function findByClientId(query) {
      if (query) {
        return Client.findById({
          id: query,
        })
          .$promise.then(function(client) {
            if (!client) return $q.reject()

            const ids = [client.clientId]
            return ClientAddress.find({
              filter: {
                where: {
                  clientId: { inq: ids },
                },
              },
            }).$promise
          })
          .then(function(_clientAddresses) {
            const ids = _clientAddresses.map(function(clientAddress) {
              return clientAddress.addressId
            })
            return Address.find({
              filter: {
                include: { clients: ['telephones'] },
                where: {
                  addressId: { inq: ids },
                },
              },
            }).$promise
          })
      }
      throw new Error('Query is not defined')
    }

    function findByName(query) {
      if (query) {
        return Client.find({
          filter: {
            where: {
              name: { like: `%${query}%` },
            },
          },
        })
          .$promise.then(function(_clients) {
            const ids = _clients.map(function(client) {
              return client.clientId
            })
            return ClientAddress.find({
              filter: {
                where: {
                  clientId: { inq: ids },
                },
              },
            }).$promise
          })
          .then(function(_clientAddresses) {
            const ids = _clientAddresses.map(function(clientAddress) {
              return clientAddress.addressId
            })
            return Address.find({
              filter: {
                include: { clients: ['addresses', 'telephones'] },
                where: {
                  addressId: { inq: ids },
                },
              },
            }).$promise
          })
      }
      throw new Error('Query is not defined')
    }

    function findByAddress(query) {
      if (query) {
        return Address.find({
          filter: {
            include: { clients: ['addresses', 'telephones'] },
            where: {
              or: [
                { streetName: { like: `%${query}%` } },
                { neighborhood: { like: `%${query}%` } },
                { details: { like: `%${query}%` } },
                { referencePoint: { like: `%${query}%` } },
                { number: { like: `%${query}%` } },
                { block: { like: `%${query}%` } },
              ],
            },
          },
        }).$promise
      }
      throw new Error('Query is not defined')
    }

    function findByPhone(query) {
      if (query) {
        return Telephone.find({
          filter: {
            where: { number: { like: `%${query}%` } },
          },
        })
          .$promise.then(function(_phones) {
            const ids = _phones.map(function(phone) {
              return phone.clientId
            })
            return ClientAddress.find({
              filter: {
                where: {
                  clientId: { inq: ids },
                },
              },
            }).$promise
          })
          .then(function(_clientAddresses) {
            const ids = _clientAddresses.map(function(clientAddress) {
              return clientAddress.addressId
            })
            return Address.find({
              filter: {
                include: { clients: ['addresses', 'telephones'] },
                where: {
                  addressId: { inq: ids },
                },
              },
            }).$promise
          })
          .then(function(addresses) {
            return addresses
          })
      }
      throw new Error('Query is not defined')
    }
  }
})()
