/* eslint-disable */

// TODO Legacy code, please refactor me!
/**
 * Created by Richard on 15/05/2016.
 */

(function () {
    "use strict";

    // Módulos externos
    var Promise = require("bluebird");
    var fs = require("fs");
    var path = require("path");
    var moment = require("moment");
    var winston = require("winston");

    // Módulos internos
    var Utils = require("../../server/controller/utils/general");

    // Escopo local
    var logger, loggerLevel = "warn";

    module.exports = main;

    function main(Dashboard) {
        Dashboard.get = getDashboard(Dashboard);
    }

    /**
     * Realiza consultas para construção do dashboard
     * @param Dashboard
     * @returns {Function}
     */
    function getDashboard(Dashboard) {
        init();

        // Argumentos
        var mArgs = {
            accepts: [
                {arg: "begin", type: "Date", required: false},
                {arg: "end", type: "Date", required: false}
            ], returns: {type: "object", root: true},
            http: {verb: "get"}
        };
        Dashboard.remoteMethod("get", mArgs);

        return function (begin, end, callback) {
            var p = new Period();
            var db = Dashboard.dataSource.connector;
            var today = p.today(), week = p.week(), month = p.month();
            var timeCounter = new TimeCounter(), dashboard = {};
            var pathDir, queryDashboard;

            // Validação de obrigatoriedade
            if (begin && !end)
                return callback("Você precisar informar a data de fim para a consulta");
            if (!begin && end)
                return callback("Você precisar informar a data de início para a consulta");

            // Validação de formato
            if (begin && end) {
                if (!(begin instanceof Date && end instanceof Date)) {
                    if (!moment(begin, p.defaultInputFormat, true).isValid())
                        return callback("A data de início está formatada incorretamente");
                    if (!moment(end, p.defaultInputFormat, true).isValid())
                        return callback("A data de fim está formatada incorretamente");
                }
            }

            // Contagem do tempo: duração da requisiçao
            timeCounter.start();

            if (begin && end) {
                throw new Error("Not implemented!");
                //// Carregando SQL
                //pathDir = path.join(__dirname, "dashboard", "query1.sql");
                //queryDashboard = fs.readFileSync(pathDir, "utf-8");
                //// Aplicando parâmetros ao SQL
                //queryDashboard = Utils.format(queryDashboard, "amount", "?", "?");
                //
                //logger.log("debug", queryDashboard);
                //
                //(function () {
                //    return new Promise(function (resolve, reject) {
                //        db.query(queryDashboard, [begin, end], function (err, result) {
                //            if (err) reject(err);
                //            else resolve(result);
                //        });
                //    });
                //})().then(function (results) {
                //    store("amount", results[0]);
                //});
            }
            // Obtenção do dashboard com as opções padrão: hoje, da semana, e do mês
            else {
                // Carregando SQL
                pathDir = path.join(__dirname, "dashboard", "query2.sql");
                queryDashboard = fs.readFileSync(pathDir, "utf-8");
                // Aplicando parâmetros ao SQL
                queryDashboard = Utils.format2(queryDashboard,
                    today.from, today.to,
                    week.from, week.to,
                    month.from, month.to
                );

                logger.log("debug", queryDashboard);

                (function () {
                    return new Promise(function (resolve, reject) {
                        db.query(queryDashboard, [], function (err, result) {
                            if (err) reject(err);
                            else resolve(result);
                        });
                    });
                })().then(function (results) {
                    timeCounter.end();
                    callback(null, {
                        today: {
                            count: results[0] && results[0].todayCount || 0,
                            amount: results[0] && results[0].todayAmount || 0
                        },
                        week: {
                            count: results[0] && results[0].weekCount || 0,
                            amount: results[0] && results[0].weekAmount || 0
                        },
                        month: {
                            count: results[0] && results[0].monthCount || 0,
                            amount: results[0] && results[0].monthAmount || 0
                        },
                        duration: timeCounter.duration()
                    });
                });
            }
        }
    }

    /**
     * Inicialização do módulo
     */
    function init() {
        winston.loggers.add("dashboard", {
            console: {
                level: loggerLevel,
                colorize: true,
                label: "dashboard"
            }
        });

        logger = winston.loggers.get("dashboard");
    }

    /**
     * Expõe períodos para os filtros necessários à montagem do dashboard. De hoje, da semana, do mês.
     * @returns {{}}
     * @constructor
     */
    function Period() {
        var context = {};
        context.defaultInputFormat = "YYYY-MM-DD HH:mm:ss";

        /**
         * Filtro: de hoje
         * @returns {{from, to}|{from: *, to: *}}
         */
        context.today = function () {
            var from = moment().startOf("day");
            var to = moment().endOf("day");
            return period(from, to);
        };

        /**
         * Filtro: da semana
         * @returns {{from, to}|{from: *, to: *}}
         */
        context.week = function () {
            var from = moment().startOf("week");
            var to = moment().endOf("week");
            return period(from, to);
        };

        /**
         * Filtro: do mês
         * @returns {{from, to}|{from: *, to: *}}
         */
        context.month = function () {
            var from = moment().startOf("month");
            var to = moment().endOf("month");
            return period(from, to);
        };

        /**
         * Deserializa uma data serializada no formato padrão adotado.
         * @param string
         * @returns {*}
         */
        context.parse = function (string) {
            return moment(string, defaultInputFormat);
        };

        /**
         * Gera um intervalo de datas, já aplicando a compensação de fuso horário.
         * @param from YYYY-MM-DD HH:mm:ss
         * @param to YYYY-MM-DD HH:mm:ss
         * @returns {{from: *, to: *}}
         */
        function period(from, to) {
            if (typeof from === "string")
                from = parse(from);
            if (typeof to === "string")
                to = parse(to);

            from = Utils.utc(from);
            to = Utils.utc(to);
            return {
                from: from.format(context.defaultInputFormat),
                to: to.format(context.defaultInputFormat)
            };
        }

        return context;
    }

    /**
     * Contador de tempo.
     * @returns {{}}
     * @constructor
     */
    function TimeCounter() {
        var context = {};
        var mStart, mEnd;

        /**
         * Inicia a contagem de tempo
         */
        context.start = function () {
            mStart = moment();
        };

        /**
         * Finaliza a contagem de tempo
         */
        context.end = function () {
            mEnd = moment();
        };

        /**
         * @returns {*} Retorna a duração (em segundos) da tarefa contabilizada.
         */
        context.duration = function () {
            if (mStart && mEnd)
                return mEnd.diff(mStart, "seconds", true);
            else
                return null;
        };

        return context;
    }
})();