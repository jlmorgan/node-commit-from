"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const get = require("lodash/fp/get");
const pipe = require("lodash/fp/pipe");
const reduce = require("lodash/fp/reduce");

// Project
const resolveFilePath = require("./resolveFilePath");
const setValue = require("../../src/util/setValue");

module.exports = curry((filePaths, config) => reduce(
  (result, path) => pipe(
    get(path),
    resolveFilePath,
    setValue(path, result)
  )(result),
  config,
  filePaths
));
