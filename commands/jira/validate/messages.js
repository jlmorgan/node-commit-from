"use strict";

module.exports = {
  mustBePositiveInteger(property) {
    return `Jira config property '${property}' must be a positive integer.`;
  },

  mustBePopulatedString(property) {
    return `Jira config property '${property}' must be a populated string.`;
  }
};
