"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const set = require("lodash/fp/set");

module.exports = curryN(3, (path, source, value) => set(path, value, source));
