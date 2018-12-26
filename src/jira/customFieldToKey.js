"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const find = require("lodash/fp/find");
const flow = require("lodash/fp/flow");
const get = require("lodash/fp/get");
const startsWith = require("lodash/fp/startsWith");
const toLower = require("lodash/fp/toLower");

module.exports = curry((fields, name) => (startsWith("customfield_", toLower(name)) ?
  flow(find({ id: name }), get("name"))(fields) :
  name
));
