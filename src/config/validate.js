"use strict";

// Node
const fs = require("fs");

// Third Party
const include = require("include")(__dirname);
const Promise = require("bluebird");
const stream = require("lodash/fp");
const Validation = require("lodash-fantasy/data/Validation");

// Third Party Aliases
const get = stream.get;
const identity = stream.identity;
const isEmpty = stream.isEmpty;
const map = stream.map;
const negate = stream.negate;
const isNotEmpty = negate(isEmpty);

// Project
const filePaths = require("./filePaths");
const getValue = include("src/util/getValue");

module.exports = config => Validation.reduce(
  Validation.concat,
  Validation.of(config),
  stream(filePaths)
    .map(getValue(config))
    .filter(isNotEmpty)
    .map(filePath => () => fs.lstatSync(filePath))
    .map(Validation.try)
    .value()
)
.bimap(map(get("message")), identity)
.toPromiseWith(Promise);
