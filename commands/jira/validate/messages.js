"use strict";

module.exports = {
  mustBePopulatedString: property => `Jira config property '${property}' must be a populated string.`,
  mustBePositiveInteger: property => `Jira config property '${property}' must be a positive integer.`
};
