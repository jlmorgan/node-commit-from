"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const exec = include("lib/child_process/exec");

module.exports = name => exec(`git remote get-url ${name}`);
