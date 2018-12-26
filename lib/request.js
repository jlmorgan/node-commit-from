"use strict";

// Third Party
const request = require("request");
const set = require("lodash/fp/set");

/**
 * Wraps the <code>request</code> library in a <code>Promise</code>.
 * @private
 * @param {Object} options - Options to pass to <code>request</code>.
 * @return {Promise}
 * @example
 *
 * request(options).then(doSomething);
 */
function requestAsPromise(options) {
  return new Promise((resolve, reject) => request(options, (error, response, body) => (error ?
    reject(error) :
    resolve(set("body", body, response))
  )));
}

module.exports = requestAsPromise;
