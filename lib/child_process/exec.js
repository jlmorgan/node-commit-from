"use strict";

// Node
const childProcess = require("child_process");

// Third Party
const Promise = require("bluebird");

module.exports = command => new Promise((resolve, reject) =>
  childProcess.exec(command, (error, stdout, stderr) => error ? reject(stderr) : resolve(stdout))
);
