"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const get = require("lodash/fp/get");
const flow = require("lodash/fp/flow");
const include = require("include")(__dirname);
const reduce = require("lodash/fp/reduce");

// Project
const resolveFilePath = require("./resolveFilePath");
const setValue = include("src/util/setValue");

module.exports = curry((filePaths, config) => reduce(
  (result, path) => flow(
    get(path),
    resolveFilePath,
    setValue(path, result)
  )(result),
  config,
  filePaths
));
