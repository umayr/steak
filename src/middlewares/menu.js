/**
 * Author: Umayr Shahid <umayrr@hotmail.com>,
 * Created: 22:05, 29/06/15.
 */

// There are five actions available in `epilogue` api, that are:
// `create`, `list`, `read`, `update`, `delete`.
//
// Each action has seven milestones, that are as follows:
//
//  - start: ran at the beginning of the request
//  - auth: authorize the request
//  - fetch: fetch data from the database
//  - data: transform the database data
//  - write: write to the database
//  - send: send response to the user
//  - complete: request completed
//
// Milestones provide opportunities to run custom application code at various important steps
// throughout the duration of the request.
//
// Resources have properties for each controller action as defined above: `create`, `list`, `read`, `update` & `delete`.
// Also find a meta property all as a convenience for hooking into milestones across all controllers.
//
// Each of those properties in turn has methods for setting custom behavior.
// For each milestone on a given controller we accept a function to specify custom behavior.
//
// If multiple functions are registered for a hook they will be ran in order.
// Functions can expect three parameters: a request, a response, and a context object.
//
// A milestone can have three states:
//
// - before: modify data before action
// - action: perform action
// - after: modify data after
//
// To read more about Milestones: https://github.com/dchester/epilogue/blob/master/docs/Milestones.md

'use strict';

var _ = require('lodash');
var is = require('is_js');

module.exports = {
  list: {
    write: {
      before: function (req, res, context) {
        if (is.array(context.instance)) {
          _.each(context.instance, function (item) {
            item.description = (new Buffer(item.description)).toString()
          });
        }
        return context.continue;
      }
    }
  },
  all: {
    auth: function (req, res, context) {
      return context.continue;
    }
  }
};
