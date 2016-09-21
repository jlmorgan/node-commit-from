"use strict";

// Third Party
const stream = require("lodash/fp");
const Validation = require("lodash-fantasy/data/Validation");

// Third Party Aliases
const Failure = Validation.Failure;
const get = stream.get;
const Success = Validation.Success;

const rules = require("./validate/rules");

module.exports = function (config) {
  return stream(rules)
    .map(rule => rule.predicate(get(rule.property, config)) ?
      Success.from(config) :
      Failure.from(rule.predicate(rule.property))
    )
    .reduce(Validation.concat);
};
