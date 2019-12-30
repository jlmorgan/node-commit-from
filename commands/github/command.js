"use strict";

// Third Party
const entities = require("entities");
const get = require("lodash/fp/get");
const getOr = require("lodash/fp/getOr");
const handlebars = require("handlebars");
const pick = require("lodash/fp/pick");
const pipe = require("lodash/fp/pipe");
const Promise = require("bluebird");

// Project
const applyRequestOptions = require("./applyRequestOptions");
const clientOptions = require("./clientOptions");
const createApiRepoUrl = require("./createApiRepoUrl");
const getIssuesUrl = require("./getIssuesUrl");
const getRepoRemoteUrl = require("./getRepoRemoteUrl");
const handleIssueResponse = require("./handleIssueResponse");
const handleRequestErrors = require("./handleRequestErrors");
const readFile = require("../../lib/fs/readFile");
const request = require("../../lib/request");
const resolveFilePath = require("../../src/util/resolveFilePath");
const setIssueSelector = require("./setIssueSelector");
const setIssueSource = require("./setIssueSource");
const setValue = require("../../src/util/setValue");

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
 *
 * @param {Object} config - Application configuration.
 * @param {Object} argv - CLI argument key-value pairs.
 * @return {Promise.<String>}
 */
module.exports = (config, argv) => Promise.resolve(argv)
  .then(pipe(
    setIssueSource,
    setIssueSelector
  ))
  .then(values => getRepoRemoteUrl(getOr("origin", "remote", values))
    .then(pipe(
      createApiRepoUrl,
      setValue("url", pick(clientOptions, get("github", config))),
      applyRequestOptions,
      request
    ))
    .then(handleRequestErrors)
    .then(getIssuesUrl(config, values))
  )
  .then(pipe(
    setValue("url", pick(clientOptions, get("github", config))),
    applyRequestOptions,
    request
  ))
  .then(handleRequestErrors)
  .then(handleIssueResponse)
  .then(data => readFile(resolveFilePath(getOr(get("github.template", config), "template", argv)), "utf8")
    .then(pipe(
      handlebars.compile,
      template => template(get("body", data)),
      entities.decode,
      console.log
    ))
  )
  .catch(pipe(
    console.error,
    () => {
      process.exitCode = 1;
    }
  ));
