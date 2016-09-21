"use strict";

// Third Party
const get = require("lodash/fp/get");

module.exports = response => get("statusCode", response) == 200 ?
  response :
  Promise.reject(get("body.message", response));
