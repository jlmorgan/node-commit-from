"use strict";

// Third Party
const get = require("lodash/fp/get");
const set = require("lodash/fp/set");

// Project Aliases
const getOwner = get("owner");
const getParent = get("parent");
const getSource = get("source");

module.exports = values => set(
  "issueSource",
  getOwner(values) ? "owner" : getParent(values) || getSource(values) || "current",
  values
);
