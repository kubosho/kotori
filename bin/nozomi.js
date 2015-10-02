#!/usr/bin/env node

"use strict";

const cli = require("../lib/cli/cli");

let exitCode = cli.execute(process.argv);

process.on("exit", function() {
  process.exit(exitCode);
});
