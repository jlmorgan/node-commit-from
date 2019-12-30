"use strict";

// Project
const handler = require("./command");
const options = require("./options");
const validateIssueSource = require("./validateIssueSource");

module.exports = config => ({
  builder: yargs => yargs
    .check(validateIssueSource)
    .example("$0 github issue-1")
    .example("$0 github issue-2 -o someuser")
    .example("$0 github issue-3 -p")
    .example("$0 github issue-4 -s")
    .example("$0 github issue-5 -t /path/to/custom/template.txt")
    .options(options),
  command: "github <issueId>",
  describe: "Create commit message from GitHub.",
  handler: argv => handler(config, argv)
});
