"use strict";

// Third Party
const isEmpty = require("lodash/fp/isEmpty");
const isInteger = require("lodash/fp/isInteger");
const isString = require("lodash/fp/isString");
const negate = require("lodash/fp/negate");

// Third Party Aliases
const isNotEmpty = negate(isEmpty);

module.exports = {
  isPopulatedString(value) {
    return isString(value) && isNotEmpty(value);
  },

  isPositiveInteger(value) {
    return isInteger(value) && value > 0;
  }
};
