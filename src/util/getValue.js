"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const get = require("lodash/fp/get");

module.exports = curry((source, path) => get(path, source));
