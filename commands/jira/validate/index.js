"use strict";

// Third Party
const F = require("lodash/fp");
const Validation = require("lodash-fantasy/data/Validation");

// Project
const rules = require("./rules");

module.exports = function validate(config) {
  const { Failure, Success } = Validation;

  return F(rules)
    .map(rule => (rule.predicate(F.get(rule.property, config)) ?
      Success.from(config) :
      Failure.from(rule.message(F.get(rule.property, config)))
    ))
    .reduce(Validation.concat);
};
