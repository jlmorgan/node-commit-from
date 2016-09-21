"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const gitRemoteUrl = include("src/git/remote/getUrl");

module.exports = name => gitRemoteUrl(name)
  .then(remoteUrl => remoteUrl.match("github") ? remoteUrl : Promise.reject("Project is not hosted on GitHub."));
