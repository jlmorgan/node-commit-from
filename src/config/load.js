"use strict";

// Third Party
const get = require("lodash/fp/get");
const pipe = require("lodash/fp/pipe");
const set = require("lodash/fp/set");

// Project
const filePaths = require("./filePaths");
const getConfigFilePath = require("./getConfigFilePath");
const parseProperties = require("../../lib/properties/parse");
const resolveFilePaths = require("../../src/util/resolveFilePaths");
const validate = require("./validate");

const defaults = {
  timeout: 75000
};

module.exports = () => parseProperties(getConfigFilePath())
  .then(pipe(
    resolveFilePaths(filePaths),
    validate
  ))
  .then(config => pipe(
    set("github.timeout", get("github.timeout", config) || defaults.timeout),
    set("jira.timeout", get("jira.timeout", config) || defaults.timeout)
  )(config));
