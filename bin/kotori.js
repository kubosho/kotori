#!/usr/bin/env node

const cli = require("../lib/cli/cli").default;

const exitCode = cli(process.argv);

process.on("exit", () => {
  process.exit(exitCode);
});
