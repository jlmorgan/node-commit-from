"use strict";

// Third Party
const options = require("./options");

// Project
const handler = require("./command");

module.exports = config => ({
  builder: yargs => yargs
    .example("$0 jira issue-1")
    .example("$0 jira issue-2 -t /path/to/custom/template.txt")
    .options(options),
  command: "jira <issueId>",
  describe: "Create commit message from Jira.",
  handler: argv => handler(config, argv)
});
