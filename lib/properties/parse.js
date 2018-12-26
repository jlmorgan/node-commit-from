"use strict";

// Third Party
const Promise = require("bluebird");
const properties = require("properties");

// Project
const options = require("./options");

module.exports = filePath => new Promise(
  (resolve, reject) => properties.parse(filePath, options, (error, data) => (error ? reject(error) : resolve(data)))
);
