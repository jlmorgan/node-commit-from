"use strict";

// Node
const { parse } = require("url");

// Third Party
const compact = require("lodash/fp/compact");
const get = require("lodash/fp/get");
const pipe = require("lodash/fp/pipe");
const replace = require("lodash/fp/replace");
const split = require("lodash/fp/split");
const trim = require("lodash/fp/trim");
const zipObject = require("lodash/fp/zipObject");

module.exports = pipe(
  trim,
  replace(/^git@github\.com:/u, "https://github.com/"),
  replace(/\.git$/u, ""),
  parse,
  get("path"),
  split("/"),
  compact,
  zipObject(["owner", "repo"]),
  values => `https://api.github.com/repos/${values.owner}/${values.repo}`
);
