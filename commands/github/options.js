"use strict";

module.exports = {
  "o": {
    "alias": "owner",
    "describe": "Specific owner in the repository fork chain.",
    "group": "Issue source:",
    "nargs": 1,
    "type": "string"
  },
  "p": {
    "alias": "parent",
    "coerce": value => value ? "parent" : "",
    "describe": "Immediate parent repository in the fork chain.",
    "group": "Issue source:",
    "type": "boolean"
  },
  "s": {
    "alias": "source",
    "coerce": value => value ? "source" : "",
    "describe": "Source repository in the fork chain.",
    "group": "Issue source:",
    "type": "boolean"
  },
  "t": {
    "alias": "template",
    "description": "Override template defined in the config with this template.",
    "type": "string"
  }
};
