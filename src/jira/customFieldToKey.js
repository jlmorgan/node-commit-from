"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const find = require("lodash/fp/find");
const flow = require("lodash/fp/flow");
const get = require("lodash/fp/get");
const startsWith = require("lodash/fp/startsWith");

module.exports = curry((fields, name) => startsWith("customField_", name) ?
  flow(find({ id: name }), get("name"))(fields) :
  name
);
