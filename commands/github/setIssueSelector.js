"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const get = require("lodash/fp/get");
const replace = require("lodash/fp/replace");
const set = require("lodash/fp/set");

// Project Aliases
const getOwner = get("owner");
const getIssueSource = get("issueSource");

const selectorMap = new Map()
  .set("current", () => get("issues_url"))
  .set("owner", curry((values, body) => replace(
    getOwner(body),
    getOwner(values),
    get("issues_url", body)
  )))
  .set("parent", () => get("parent.issues_url"))
  .set("source", () => get("source.issues_url"));

module.exports = values => set(
  "selector",
  selectorMap.get(getIssueSource(values))(values),
  values
);
