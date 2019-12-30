"use strict";

// Third Party
const get = require("lodash/fp/get");

/**
 * HTTP status Success: OK.
 *
 * @private
 * @type {Number}
 */
const OK = 200;

module.exports = response => (get("statusCode", response) === OK ?
  response :
  Promise.reject(get("body.message", response))
);
