/* eslint-disable */

// TODO Legacy code, please refactor me!'use strict';
module.exports = function (SystemVersion) {
    var fs = require("fs");
    var path = require("path");

    SystemVersion.getSystemVersion = function (cb) {
        var application = path.join(process.cwd(), "package.json");
        fs.readFile(application, "utf-8", function (err, application) {
            application = JSON.parse(application);
            cb(null, application.version);
        });
    };

    SystemVersion.remoteMethod('getSystemVersion', {
        http: {path: "/get", verb: "get"},
        returns: {arg: "version", type: 'string'}
    });

};
