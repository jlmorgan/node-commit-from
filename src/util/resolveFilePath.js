"use strict";

// Node
const os = require("os");

// Third Party
const flow = require("lodash/fp/flow");
const replace = require("lodash/fp/replace");

module.exports = flow(
  replace(/^\.\//, `${process.cwd()}/`),
  replace(/^~/, os.homedir())
);
