"use strict";

// Third Party
const map = require("lodash/fp/map");
const pick = require("lodash/fp/pick");
const pipe = require("lodash/fp/pipe");
const sum = require("lodash/fp/sum");
const values = require("lodash/fp/values");

module.exports = pipe(
  pick(["o", "p", "s"]),
  values,
  map(Boolean),
  map(Number),
  sum,
  value => (value > 1 ?
    `Expected an issue source, but received ${value || "none"}.` :
    true
  )
);
