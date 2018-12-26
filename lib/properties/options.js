"use strict";

const reviver = require("./reviver");

module.exports = {
  comments: "#",
  include: true,
  namespaces: true,
  path: true,
  reviver,
  sections: true,
  separators: "=",
  strict: true,
  variables: true
};
