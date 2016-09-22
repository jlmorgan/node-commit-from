"use strict";

// Node
const path = require("path");

// Project
const fileExtension = require("./fileExtension");

module.exports = () => path.join(__dirname, "..", "..", "config", `example${fileExtension}`);
