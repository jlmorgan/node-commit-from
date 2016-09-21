"use strict";

// Project
const messages = require("./messages");
const predicates = require("./predicates");

module.exports = [
  {
    message: messages.mustBePositiveInteger,
    property: "apiVersion",
    predicate: predicates.isPositiveInteger
  },
  {
    message: messages.mustBePopulatedString,
    property: "host",
    predicate: predicates.isPopulatedString
  },
  {
    message: messages.mustBePopulatedString,
    property: "password",
    predicate: predicates.isPopulatedString
  },
  {
    message: messages.mustBePopulatedString,
    property: "username",
    predicate: predicates.isPopulatedString
  }
];
