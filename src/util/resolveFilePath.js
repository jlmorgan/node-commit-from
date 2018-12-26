"use strict";

// Node
const os = require("os");

// Third Party
const flow = require("lodash/fp/flow");
const replace = require("lodash/fp/replace");

module.exports = flow(
  replace(/^\.\//u, `${process.cwd()}/`),
  replace(/^~/u, os.homedir())
);
