"use strict";

// Node
const fs = require("fs");

// Third Party
const Promise = require("bluebird");

module.exports = Promise.promisify(fs.readFile);
