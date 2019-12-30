"use strict";

// Project
const gitRemoteUrl = require("../../src/git/remote/getUrl");

module.exports = name => gitRemoteUrl(name)
  .then(remoteUrl => (remoteUrl.match("github") ? remoteUrl : Promise.reject("Project is not hosted on GitHub.")));
