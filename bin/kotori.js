#!/usr/bin/env node

const cli = require("../lib/cli/cli");

const exitCode = cli(process.argv).default;

process.on("exit", () => {
  process.exit(exitCode);
});
