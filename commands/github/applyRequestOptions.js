"use strict";

// Third Party
const pipe = require("lodash/fp/pipe");
const set = require("lodash/fp/set");

// Project
const { name, version } = require("../../package");

module.exports = pipe(
  set("headers.user-agent", `${name}/${version}`),
  set("json", true),
  set("method", "GET")
);
