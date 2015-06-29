/**
 * Author: Umayr Shahid <umayrr@hotmail.com>,
 * Created: 22:06, 29/06/15.
 */

'use strict';

var middleware = require('../middlewares/restaurant');
var model = require('../../lib/models/restaurant');

module.exports = function (epilogue) {
  var resource = epilogue.resource({
    model: model,
    endpoints: ['/restaurant', '/restaurant/:uuid'],
    sort: {
      attributes: ['name', 'type', 'rating']
    },
    search: {
      attributes: ['name', 'type']
    }
  });
  resource.use(middleware);

  return resource;
};
