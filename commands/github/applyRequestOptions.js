"use strict";

// Third Party
const include = require("include")(__dirname);
const flow = require("lodash/fp/flow");
const set = require("lodash/fp/set");

// Project
const pkg = include("package");

module.exports = flow(
  set("headers.user-agent", `${pkg.name}/${pkg.version}`),
  set("json", true),
  set("method", "GET")
);
