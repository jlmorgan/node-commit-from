"use strict";

// Third Party
const flow = require("lodash/fp/flow");
const get = require("lodash/fp/get");
const getOr = require("lodash/fp/getOr");
const replace = require("lodash/fp/replace");

// Project Aliases
const getIssueId = get("issueId");
const getIssuePrefix = getOr("", "github.issuePrefix");

module.exports = (config, values) => flow(
  get("body"),
  values.selector,
  replace("{/number}", replace(getIssuePrefix(config), "/", getIssueId(values))),
  value => value ? value : Promise.reject("No issues URL specified for issue source.")
);
