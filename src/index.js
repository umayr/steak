/**
 * Author: Umayr Shahid <umayrr@hotmail.com>,
 * Created: 19:19, 29/06/15.
 */

'use strict';

module.exports = function (server, epilogue, database, env) {
  require('./resources/menu')(epilogue);
  require('./resources/restaurant')(epilogue);

  database
    .sync()
    .then(function () {
      server.listen(env.port, function () {
        console.log('%s listening at %s', process.env['npm_package_name'], server.url);
      });
    });
};

