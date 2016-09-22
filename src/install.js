"use strict";

// Node
const fs = require("fs");

// Project
const getConfigFilePath = require("./config/getConfigFilePath");
const getExamplePath = require("./config/getExamplePath");

const fileOptions = {
  mode: 0o600
};

fs.lstat(getConfigFilePath(), lstatError => lstatError ?
  fs.readFile(getExamplePath(), (readError, exampleData) => readError ?
    console.error(`Example config not found in ${getExamplePath()}`) :
    fs.writeFile(getConfigFilePath(), exampleData, fileOptions, writeError => writeError ?
      console.error(`Could not write file to ${getConfigFilePath()}`) :
      console.log(`Copied example to ${getConfigFilePath()}`, "\n", "Update the values in your ~/.cfconfig file.")
    )
  ) :
  console.info("Config file already exists...")
);
