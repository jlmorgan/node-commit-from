"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const get = require("lodash/fp/get");
const mapKeys = require("lodash/fp/mapKeys");

// Project
const customFieldToKey = require("./customFieldToKey");

module.exports = curry((issue, fields) => mapKeys(
  customFieldToKey(fields),
  get("fields", issue)
));
