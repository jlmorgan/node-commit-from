"use strict";

// Third Party
const entities = require("entities");
const get = require("lodash/fp/get");
const getOr = require("lodash/fp/getOr");
const handlebars = require("handlebars");
const isArray = require("lodash/fp/isArray");
const JiraApi = require("jira-client");
const pick = require("lodash/fp/pick");
const pipe = require("lodash/fp/pipe");
const Promise = require("bluebird");
const spread = require("lodash/fp/spread");
const values = require("lodash/fp/values");
const zipObject = require("lodash/fp/zipObject");

// Project
const jiraClientOptions = require("./clientOptions");
const mapCustomFieldKeys = require("../../src/jira/mapCustomFieldKeys");
const readFile = require("../../lib/fs/readFile");
const setValue = require("../../src/util/setValue");
const resolveFilePath = require("../../src/util/resolveFilePath");
const validateConfig = require("./validateConfig");

/**
 * Workflow:
 *   1. Validate the values loaded from the application configuration.
 *   2. Convert to a Promise from Validation.
 *   3. Pick options from the config that apply to the jira-client.
 *   4. Create a new client.
 *   5. Make requests for:
 *     - Get the issue data from Jira.
 *     - Get the list of custom fields.
 *     - Load the template provided from the CLI or the config file.
 *   6. Zip the values with semantic keys.
 *   7. Pick the Jira related data.
 *   8. Get the values from the zipped object.
 *   9. Use the Jira values as arguments to map the custom fields onto the issue fields data.
 *   10. Compile the template.
 *   11. Apply the data.
 *   12. Log the result.
 *
 * @param {Object} config - Application configuration.
 * @param {Object} argv - CLI argument key-value pairs.
 * @return {Promise.<String>}
 */
module.exports = (config, argv) => validateConfig(get("jira", config))
  .toPromise(Promise)
  .then(pipe(
    pick(jiraClientOptions),
    options => new JiraApi(options)
  ))
  .then(jiraClient => Promise.all([
    jiraClient.findIssue(get("issueId", argv)),
    jiraClient.listFields(),
    readFile(
      resolveFilePath(getOr(get("jira.template", config), "template", argv)),
      "utf8"
    )
  ]))
  .catch(error => Promise.reject(error.message))
  .then(zipObject(["issue", "fields", "template"]))
  .then(data => pipe(
    pick(["issue", "fields"]),
    values,
    spread(mapCustomFieldKeys),
    setValue("fields", get("issue", data)),
    handlebars.compile(get("template", data)),
    entities.decode,
    console.log
  )(data))
  .catch(pipe(
    error => (isArray(error) ? error.join("\n") : getOr(error, "response.statusMessage", error)),
    console.error,
    () => {
      process.exitCode = 1;
    }
  ));
