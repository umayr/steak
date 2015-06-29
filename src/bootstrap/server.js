/**
 * Author: Umayr Shahid <umayrr@hotmail.com>,
 * Created: 23:14, 29/06/15.
 */

'use strict';

var restify = require('restify');

module.exports = function (log) {
  var server = restify.createServer({
    name: 'restify', // TODO: Fix this name problem. It won't run if you provide custom name. Fuck, epilogue.
    version: process.env['npm_package_version'],
    log: log
  });

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());

  server.pre(function (req, res, next) {
    server.log.info({req: req}, 'In `server.pre`. ;3');
    next();
  });

  return server;
};
