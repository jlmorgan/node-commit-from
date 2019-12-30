"use strict";

// Project
const messages = require("./messages");
const predicates = require("./predicates");

module.exports = [
  {
    message: messages.mustBePositiveInteger,
    predicate: predicates.isPositiveInteger,
    property: "apiVersion"
  },
  {
    message: messages.mustBePopulatedString,
    predicate: predicates.isPopulatedString,
    property: "host"
  },
  {
    message: messages.mustBePopulatedString,
    predicate: predicates.isPopulatedString,
    property: "password"
  },
  {
    message: messages.mustBePopulatedString,
    predicate: predicates.isPopulatedString,
    property: "username"
  }
];
