"use strict";

// Third Party
const get = require("lodash/fp/get");
const pipe = require("lodash/fp/pipe");
const Promise = require("bluebird");

/**
 * Client errors.
 *
 * @private
 * @type {Number}
 */
const CLIENT_ERROR = 400;

/**
 * Server errors.
 *
 * @private
 * @type {Number}
 */
const SERVER_ERROR = 500;

/**
 * Unknown errors.
 *
 * @private
 * @type {Number}
 */
const UNKNOWN_ERROR = 600;

/**
 * Unpacks the message from the JSON body and rejects.
 *
 * @private
 * @type {Function}
 * @param {Object} response - HTTP response.
 * @returns {Promise}
 */
const handleClientErrors = pipe(
  get("body.message"),
  Promise.reject
);

/**
 * Unpacks the status message from the JSON body and rejects.
 *
 * @private
 * @type {Function}
 * @param {Object} response - HTTP response.
 * @returns {Promise}
 */
const handleServerErrors = pipe(
  get("statusMessage"),
  Promise.reject
);

/**
 * Handle client and server errors.
 *
 * @private
 * @param {Object} response - HTTP response.
 * @return {Promise}
 */
function handleRequestErrors(response) {
  const statusCode = get("statusCode", response);
  let result = null;

  if (statusCode >= CLIENT_ERROR && statusCode < SERVER_ERROR) {
    result = handleClientErrors(response);
  } else if (statusCode >= SERVER_ERROR && statusCode < UNKNOWN_ERROR) {
    result = handleServerErrors(response);
  } else {
    result = Promise.resolve(response);
  }

  return result;
}

module.exports = handleRequestErrors;
