"use strict";

// Project
const validateIssueSource = require("./validateIssueSource");
const options = require("./options");

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
  handler: argv => require("./command")(config, argv) // Lazy evaluation
});
