/**
 * Author: Umayr Shahid <umayrr@hotmail.com>,
 * Created: 22:05, 29/06/15.
 */

'use strict';

var middleware = require('../middlewares/menu');
var model = require('../../lib/models/menu');

module.exports = function (epilogue) {
  var resource = epilogue.resource({
    model: model,
    endpoints: ['/menu', '/menu/:uuid'],
    sort: {
      attributes: ['name', 'type', 'price']
    },
    search: {
      attributes: ['name', 'type']
    }
  });
  resource.use(middleware);

  return resource;
};
