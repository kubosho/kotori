"use strict";

import fs from "fs";
import del from "del";
import assert from "power-assert";
import CLIEngine from "../src/cli/cli-engine";

/** @test {CLIEngine} */
describe("CLIEngine", () => {
  const outputFile = `${process.cwd()}/main.css`;

  afterEach((done) => {
    del(outputFile).then((paths) => {
      console.log("Deleted files/folders:\n", paths.join("\n"));
      done();
    }).catch((err) => {
      console.error(err);
      done();
    });
  });

  it("CSS file exists in process.cwd()", (done) => {
    const engine = new CLIEngine();
    engine.executeOnFiles([`${process.cwd()}/test/cases/main.css`]);

    setTimeout(() => {
      assert.doesNotThrow(() => fs.accessSync(outputFile, fs.R_OK), Error);
      done();
    }, 100);
  });
});
