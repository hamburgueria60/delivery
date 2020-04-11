/* eslint-disable */

// TODO Legacy code, please refactor me!

/**
 * Created by Richard on 23/02/2016.
 */

(function() {
  "use strict";

  module.exports = mModule;

  // Módulos externos
  var winston = require("winston");
  var merge = require("merge");
  var _ = require("underscore");

  // Escopo local
  var logger,
    loggerLevel = "warn"; //error, warn, info, verbose, debug, silly

  /**
   * Módulo prinicpal
   */
  function mModule(Order) {
    init();

    /**
     * Criação de um pedido, incluindo suas entidades relacionadas
     * @param {Object} order
     * @param {Function} callback
     */
    Order.createOrder = function(order, callback) {
      // Escopo local - createOrder
      var OrderItem = Order.app.models.OrderItem,
        options = {},
        orderParams = order,
        hasNoOrderItems;
      var internalData = {};

      logger.log("debug", "Paramteres recevied", arguments);

      var orderPromise = Order.beginTransaction({})
        .then(function(transaction) {
          // Escopo local - beginTransaction
          options.transaction = transaction;

          logger.log("silly", "Order.create. Pending...");
          return Order.create(
            {
              orderId: 0,
              addressId: orderParams.addressId,
              telephoneId: orderParams.telephoneId,
              tax: orderParams.tax,
              amount: orderParams.amount,
              paidValue: orderParams.paidValue,
              addition: orderParams.addition,
              discount: orderParams.discount,
              createdAt: new Date()
            },
            options.transaction
          );
        })
        .then(function(order) {
          // Escopo local - Order.create (callback)
          var items = [];

          // Atribuição do objeto Order em escopo mais elevado
          internalData.order = order;
          if (orderParams.items.length === 0) {
            hasNoOrderItems = true;
            logger.log(
              "warn",
              "There's no items in this order. I'm done here..."
            );
            return commit(order);
          } else {
            items = orderParams.items.map(function(item) {
              return {
                orderItemId: 0,
                orderId: order.orderId,
                itemId: item.itemId,
                quantity: item.quantity,
                price: item.price,
                addition: item.addition,
                discount: item.discount,
                details: !item.details ? null : item.details,
                amount: item.amount,
                createdAt: new Date()
              };
            });
            logger.log("silly", "OrderItem.create...");
            return OrderItem.create(items, options.transaction);
          }
        })
        .catch(rollback);

      if (hasNoOrderItems) {
        orderPromise
          .then(function() {
            callback(null, internalData.order);
          })
          .catch(rollback);
      } else {
        orderPromise
          .then(function() {
            return commit();
          })
          .then(function() {
            return Order.find({
              include: "items",
              where: { orderId: internalData.order.orderId }
            });
          })
          .then(function(orders) {
            if (orders.length === 0) {
              var errorMessage =
                "The object created can not found be found at this moment. Something's wrong!";
              logger.log("error", errorMessage, orderParams);
              throw new Error(errorMessage);
            } else {
              var order = orders[0];
              callback(null, order);
            }
          })
          .catch(rollback);
      }

      function rollback(err) {
        logger.log("error", err);
        options.transaction &&
          options.transaction.rollback().then(function() {
            throw err;
          });
      }

      function commit() {
        logger.log("debug", "Succesfully done!");
        return options.transaction && options.transaction.commit();
      }
    };

    Order.remoteMethod("createOrder", {
      accepts: [
        {
          arg: "order",
          type: "Object",
          required: true,
          http: { source: "body" }
        }
      ],
      returns: { arg: "order", type: "Object", root: true },
      http: { verb: "post" }
    });
  }

  /**
   * Inicialização do módulo
   */
  function init() {
    winston.loggers.add("order", {
      console: {
        level: loggerLevel,
        colorize: true,
        label: "order"
      }
    });

    logger = winston.loggers.get("order");
  }
})();
