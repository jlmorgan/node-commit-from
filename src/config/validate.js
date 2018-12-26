"use strict";

// Node
const { lstatSync } = require("fs");

// Third Party
const include = require("include")(__dirname);
const Promise = require("bluebird");
const F = require("lodash/fp");
const Validation = require("lodash-fantasy/data/Validation");

// Third Party Aliases
const isNotEmpty = F.negate(F.isEmpty);

// Project
const filePaths = require("./filePaths");
const getValue = include("src/util/getValue");

module.exports = config => Validation.reduce(
  Validation.concat,
  Validation.of(config),
  F(filePaths)
    .map(getValue(config))
    .filter(isNotEmpty)
    /* eslint-disable no-sync */
    .map(filePath => () => lstatSync(filePath))
    .map(Validation.try)
    .value()
)
  .bimap(F.map(F.get("message")), F.identity)
  .toPromise(Promise);
