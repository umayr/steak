/**
 * Author: Umayr Shahid <umayrr@hotmail.com>,
 * Created: 23:14, 29/06/15.
 */

'use strict';

var epilogue = require('epilogue');

module.exports = function (server, database) {
  epilogue.initialize({
    app: server,
    sequelize: database,
    base: '/api/v1/'
  });

  return epilogue;
};
