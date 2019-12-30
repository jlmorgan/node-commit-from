"use strict";

// Project
const exec = require("../../../lib/child_process/exec");

module.exports = name => exec(`git remote get-url ${name}`);
