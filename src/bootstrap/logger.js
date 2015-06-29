/**
 * Author: Umayr Shahid <umayrr@hotmail.com>,
 * Created: 23:14, 29/06/15.
 */

'use strict';

var Logger = require('bunyan');

module.exports = function () {
  return new Logger({
    name: process.env['npm_package_name'],
    serializers: Logger.stdSerializers
  });
};
