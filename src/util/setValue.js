"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const set = require("lodash/fp/set");

/* eslint-disable no-magic-numbers */
module.exports = curryN(3, (path, source, value) => set(path, value, source));
