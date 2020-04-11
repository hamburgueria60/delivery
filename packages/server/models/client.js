/* eslint-disable */

// TODO Legacy code, please refactor me!

/**
 * Created by Richard Lopes on 29/12/2015.
 *
 *
 * Creates Client, ClientAddresses, Addresses and Telephones.
 */
module.exports = function (Client) {
    //'use strict';

    var merge = require('merge');
    var each = require('async-each-series');

    Client.upsertWithRelations = function (client, cb) {

        var _ = require('underscore');
        var diff = new Diff();

        var Telephone = Client.app.models.Telephone;
        var Address = Client.app.models.Address;
        var ClientAddress = Client.app.models.ClientAddress;

        Client.beginTransaction({}, function (err, transaction) {
            //var mClient = {};
            var mOptions = {
                transaction: transaction
            };

            function rollback(err) {
                mOptions.transaction.rollback();
                console.log(arguments.callee.caller.toString());
                console.log(err);
                cb(err, null);
            }

            function containsKey(key, object, fixedKey) {
                var keys = Object.keys(object);
                return keys.some(function (mKey) {
                    var contains = key.indexOf(mKey) >= 0;
                    if (contains) fixedKey.key = mKey;
                    return contains;
                });
            }

            function commit() {
                mOptions.transaction.commit();
            }

            /**
             * Separate object from its relations
             * @param obj Object
             * @param relations Its relations
             */
            function organize(obj, relations) {
                obj = JSON.parse(JSON.stringify(obj));
                var separated = _.omit(obj, function (value, key) {
                    return key in relations;
                });
                var mRelations = _.omit(obj, function (value, key) {
                    return !(key in relations);
                });

                (function mapObject(object) {
                    _.each(_.keys(object), function (key) {
                        if (key in relations) {
                            if (object[key] instanceof Array) {
                                object[key].forEach(function (item) {
                                    item.primaryKey = relations[key].id;
                                    if (typeof(item) === "object") mapObject(item);
                                });
                            } else if (typeof(object[key]) === "object") {
                                object[key].primaryKey = relations[key].id;
                                mapObject(object[key]);
                            }
                        }
                    });
                })(obj);

                return merge({
                    client: separated
                }, mRelations);
            }

            var relations = {
                addresses: {
                    id: 'addressId',
                    model: 'Address',
                    through: 'ClientAddress'
                },
                telephones: {
                    id: 'telephoneId',
                    model: 'Telephone'
                }
            };

            diff.setRelations(relations);

            // discover if client already exists
            Client.find({
                include: Object.keys(relations),
                where: {
                    clientId: client.clientId
                }
            }, mOptions, function (err, clients) {

                if (err) return rollback({message: err.message, model: 'Client'});

                // if client exists, mode is edit, otherwise, mode is add.
                var mode = clients.length === 0 ? 'add' : 'edit';

                // organizing objects
                var oldClient = mode === "add" ? {} : organize(clients[0], relations);
                var newClient = organize(client, relations);

                // createdAt and/or updatedAt
                if (mode === 'add')
                    newClient.client.createdAt = newClient.client.updatedAt = new Date();
                else if (mode === 'edit')
                    newClient.client.updatedAt = new Date();

                // diff
                var mDiff = diff.getDiff(oldClient, newClient);
                var keys = Object.keys(mDiff);

                // iterate over keys from diff
                each(keys, function (key, next) {

                    var defaultCb = function (Model) {
                        return function (err) {
                            if (err) next({message: err.message, model: Model});
                            else next();
                        }
                    };

                    var fixedKey = {};
                    var mKey = key.replace('/', '');
                    var operation = mDiff[key].operation;

                    // data from main model
                    if (key.indexOf('client') > 0) {
                        if (operation === "add") {
                            Client.create(newClient.client, mOptions, function (err, _client) {
                                if (err) return defaultCb(Model)(err);
                                newClient.client = _client;
                                next();
                            });
                        } else if (operation === 'update') {
                            Client.upsert(newClient.client, mOptions, defaultCb('Client'));
                        } else if (operation === 'delete') {
                            var clientId = Client.getIdName();
                            Client.deleteById(newClient.client[clientId], mOptions, defaultCb('Client'));
                        }
                    }
                    // data from relations
                    else if (containsKey(mKey, relations, fixedKey)) {
                        var Model = relations[fixedKey.key].model;

                        if (operation === "add") {
                            // creating relations
                            // adding client data to the relation objects
                            var value = mDiff[key].value;
                            if (value instanceof Array) {
                                value.forEach(function (item, index) {
                                    value[index] = merge(newClient.client, item);
                                    value[index][Client.app.models[Model].getIdName()] = 0;
                                });
                            } else {
                                // append object
                                var dataClient = newClient.client.toJSON ?
                                    newClient.client.toJSON() : JSON.parse(JSON.stringify(newClient.client));

                                value = merge(dataClient, value);
                                value = JSON.parse(JSON.stringify(value));
                            }

                            Client.app.models[Model].create(value, mOptions, function (err, value) {
                                if (err) return defaultCb(Model)(err);

                                // relations has through model
                                if (relations[fixedKey.key].through) {
                                    var _through;
                                    var mModel = relations[fixedKey.key].through;

                                    // relation is hasMany type
                                    if (value instanceof Array) {
                                        _through = [];

                                        // iterate over array to add each of through model
                                        value.forEach(function (item) {
                                            var through = merge(newClient.client, item);
                                            through[Client.app.models[mModel].getIdName()] = 0;
                                            _through.push(through);
                                        });
                                    }
                                    // relations is belongsTo type
                                    else {
                                        // append object
                                        var through = merge(newClient.client, value);
                                        through[Client.app.models[mModel].getIdName()] = 0;
                                        _through = through;
                                    }

                                    // action
                                    Client.app.models[mModel].create(_through, mOptions, function (err, instance) {
                                        console.log(_through, instance);

                                        defaultCb(mModel)(err);
                                    });
                                } else {
                                    next();
                                }
                            });
                        } else if (operation === "update") {
                            Client.app.models[Model].upsert(mDiff[key].value, mOptions, defaultCb(Model));
                        } else if (operation === "delete") {
                            var id = Client.app.models[Model].getIdName();
                            var idValue = mDiff[key].value[id];
                            Client.app.models[Model].deleteById(idValue, mOptions, defaultCb(Model));
                        }
                    } else {
                        next();
                    }
                }, function (err) {
                    if (err) rollback(err);
                    else commit();
                    cb(null, newClient);
                });
            });
        });
    };

    Client.createWithBounds = function (client, cb) {
        var m = Client.app.models;
        var response = {};

        var defaultCallback = function (err, instance) {
            console.log(err);
            cb(err, instance);
        };

        client.createdAt = new Date();
        client.updatedAt = new Date();

        m.Client.create(client, function (err, mClient) {
            if (err) return defaultCallback(err, mClient);
            response.client = mClient;

            each(client.addresses, function (address, next) {

                m.Address.create(address, function (err, mAddress) {
                    if (err) return defaultCallback(err, mAddress);

                    address.addressId = mAddress.addressId;
                    m.ClientAddress.create({
                        clientAddressId: 0,
                        clientId: mClient.clientId,
                        addressId: mAddress.addressId
                    }, function (err, mClientAddress) {
                        if (err) return defaultCallback(err, mClientAddress);
                        next();
                    });

                });
            }, function () {
                response.addresses = client.addresses;
                delete client.addresses;

                each(client.telephones, function (telephone, next) {
                    telephone.clientId = mClient.clientId;
                    m.Telephone.create(telephone, function (err, mTelephone) {
                        if (err) return defaultCallback(err, mTelephone);

                        telephone.telephoneId = mTelephone.telephoneId;
                        next();
                    });
                }, function () {
                    response.telephones = client.telephones;

                    cb(null, response);
                });
            });
        });
    };

    Client.remoteMethod('upsertWithRelations', {
        accepts: [
            //{arg: 'mode', type: 'string', required: true, http: {source: 'path'}},
            {
                arg: 'client',
                type: 'Object',
                required: true,
                http: {
                    source: 'body'
                }
            }
        ],
        returns: {
            arg: 'client',
            type: 'Object',
            root: true
        },
        //http: {path: '/upsertWithRelations/:mode', verb: 'put'}
        http: {
            verb: 'put'
        }
    });
    Client.remoteMethod('createWithBounds', {
        accepts: [
            //{arg: 'mode', type: 'string', required: true, http: {source: 'path'}},
            {
                arg: 'client',
                type: 'Object',
                required: true,
                http: {
                    source: 'body'
                }
            }
        ],
        returns: {
            arg: 'client',
            type: 'Object',
            root: true
        },
        //http: {path: '/upsertWithRelations/:mode', verb: 'put'}
        http: {
            verb: 'put'
        }
    });
};


function Diff() {
    var _ = require('underscore');
    var relations;

    var findDiff = function (oldObject, newObject) {
        var result = {};

        _.mapObject(oldObject, function (value, key) {
            var path = "/" + key;
            if (oldObject[key] instanceof Array) {
                var array1 = oldObject[key];
                var array2 = newObject[key];

                _.each(array1, function (element, index) {
                    var mPath = path + "/" + index;
                    var matched;

                    var exists = array2.some(function (item) {
                        var _exists = element[element.primaryKey] === item[item.primaryKey];
                        if (_exists) matched = item;
                        return _exists;
                    });

                    if (exists && matched && !_.isEqual(element, matched)) {
                        result[mPath] = {operation: 'update', value: matched};
                    } else if (!exists) {
                        result[mPath] = {operation: 'delete', value: element};
                    }
                });

            } else if (typeof(oldObject[key]) === "object") {
                if (!_.isEqual(oldObject[key], newObject[key])) {
                    result[path] = {operation: 'update', value: newObject[key]};
                }
            }
        });

        _.mapObject(newObject, function (value, key) {
            var path = "/" + key;
            if (newObject[key] instanceof Array) {
                var array1 = oldObject[key];
                var array2 = newObject[key];

                _.each(array2, function (element, index) {
                    var mPath = path + "/" + index;

                    if (typeof(array1) === "undefined") {
                        result[mPath] = {operation: 'add', value: element};
                    } else {
                        var exists = array1.some(function (item) {
                            return element[element.primaryKey] === item[item.primaryKey];
                        });
                        if (!exists) result[mPath] = {operation: 'add', value: element};
                    }
                });

            } else if (typeof(newObject[key]) === "object") {
                if (typeof(oldObject[key]) === "undefined") {
                    result[path] = {operation: 'add', value: newObject[key]};
                }
            }
        });

        return result;
    };

    /**
     * Loopback relations.
     * A relations list is needed because when a relation is inside an object,
     * it is a function that needs to be called.
     * @param array
     */
    this.setRelations = function (array) {
        relations = array;
    };

    this.getDiff = function (ob1, ob2) {
        return findDiff(ob1, ob2);
    };
}
