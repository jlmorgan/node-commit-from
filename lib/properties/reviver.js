"use strict";

// Third Party
const includes = require("lodash/fp/includes");
const isString = require("lodash/fp/isString");
const map = require("lodash/fp/map");
const trim = require("lodash/fp/trim");

module.exports = function (key, value) {
  const delimiter = ",";

  return isString(value) && includes(delimiter, value) ?
    map(trim, value.split(delimiter)) :
    this.assert();
};
