"use strict";

// Third Party
const flow = require("lodash/fp/flow");
const get = require("lodash/fp/get");
const getOr = require("lodash/fp/getOr");
const handlebars = require("handlebars");
const include = require("include")(__dirname);
const Promise = require("bluebird");

// Project
const applyRequestOptions = require("./applyRequestOptions");
const createApiRepoUrl = require("./createApiRepoUrl");
const getIssuesUrl = require("./getIssuesUrl");
const getRepoRemoteUrl = require("./getRepoRemoteUrl");
const handleIssueResponse = require("./handleIssueResponse");
const readFile = include("lib/fs/readFile");
const request = include("lib/request");
const resolveFilePath = include("src/util/resolveFilePath");
const setIssueSelector = require("./setIssueSelector");
const setIssueSource = require("./setIssueSource");
const setValue = include("src/util/setValue");

/**
 * Workflow:
 *   1. Determine issue source repository within the fork chain.
 *   2. Get information from the current repository.
 *   3. Get the issues URL to use for acquiring the issue data.
 *   4. Get the data from the response.
 *   5. Load the template provided from the CLI or the config file.
 *   6. Compile the template.
 *   7. Apply the data.
 *   8. Log the result.
 * @param {Object} config - Application configuration.
 * @param {Object} argv - CLI argument key-value pairs.
 */
module.exports = (config, argv) => Promise.resolve(argv)
  .then(flow(
    setIssueSource,
    setIssueSelector
  ))
  .then(values => getRepoRemoteUrl(getOr("origin", "remote", values))
    .then(flow(
      createApiRepoUrl,
      setValue("url", {}),
      applyRequestOptions,
      request
    ))
    .then(getIssuesUrl(config, values))
  )
  .then(flow(
    setValue("url", {}),
    applyRequestOptions,
    request
  ))
  .then(handleIssueResponse)
  .then(data => readFile(
      resolveFilePath(getOr(get("github.template", config), "template", argv)),
      "utf8"
    )
    .then(flow(
      handlebars.compile,
      template => template(get("body", data)),
      console.log
    ))
  )
  .catch(console.error);
