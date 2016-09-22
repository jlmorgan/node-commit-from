"use strict";

// Third Party
const flow = require("lodash/fp/flow");
const include = require("include")(__dirname);

// Project
const filePaths = require("./filePaths");
const getConfigFilePath = require("./getConfigFilePath");
const parseProperties = include("lib/properties/parse");
const resolveFilePaths = include("src/util/resolveFilePaths");
const validate = require("./validate");

module.exports = () => parseProperties(getConfigFilePath())
  .then(flow(
    resolveFilePaths(filePaths),
    validate
  ));
