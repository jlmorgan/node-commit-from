"use strict";

// Node
const url = require("url");

// Third Party
const compact = require("lodash/fp/compact");
const flow = require("lodash/fp/flow");
const get = require("lodash/fp/get");
const replace = require("lodash/fp/replace");
const split = require("lodash/fp/split");
const trim = require("lodash/fp/trim");
const zipObject = require("lodash/fp/zipObject");

module.exports = flow(
  trim,
  replace(/^git@github\.com:/, "https://github.com/"),
  replace(/\.git$/, ""),
  url.parse,
  get("path"),
  split("/"),
  compact,
  zipObject(["owner", "repo"]),
  values => `https://api.github.com/repos/${values.owner}/${values.repo}`
);
