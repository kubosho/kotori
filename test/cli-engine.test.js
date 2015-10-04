"use strict";

import fs from "fs";
import del from "del";
import CLIEngine from "../src/cli/cli-engine";

/** @test {CLIEngine} */
describe("CLIEngine", () => {
  it("throw error (paths of too many)", () => {
    const engine = new CLIEngine();

    assert.throws(() => {
      engine.executeOnFiles([
        `${process.cwd()}/test/cases/main.css`,
        `${process.cwd()}/test/cases/main.css`,
        `${process.cwd()}/test/cases/main.css`
      ]);
    }, Error);
  });
});
