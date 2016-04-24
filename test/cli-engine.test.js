"use strict";

import assert from "power-assert";

import fs from "fs";
import CLIEngine from "../src/cli/cli-engine";

/** @test {CLIEngine} */
describe("CLIEngine", () => {
  describe("OK", (done) => {
    it("It if specified of directory in input path, CSS file to build under this directory", () => {
      const options = {
        output: "build"
      };
      const engine = new CLIEngine(options);
      engine.executeOnFiles([`${process.cwd()}/test/cases`]);

      fs.readFile("build/main.css", (err, data) => {
        assert.deepEqual(err, null);
        assert.notDeepEqual(data, null);
        done();
      });
    });
  });

  describe("NG", () => {
    it("throw error (Input path specify string)", () => {
      const engine = new CLIEngine();

      assert.throws(() => {
        engine.executeOnFiles(`${process.cwd()}/test/cases/main.css`);
      }, /specify array as argument/);
    });

    it("throw error (Input path of too many)", () => {
      const engine = new CLIEngine();

      assert.throws(() => {
        engine.executeOnFiles([
          `${process.cwd()}/test/cases/main.css`,
          `${process.cwd()}/test/cases/main.css`
        ]);
      }, /too many/);
    });

    it("throw error (Input path not specified)", () => {
      const engine = new CLIEngine();

      assert.throws(() => {
        engine.executeOnFiles([]);
      }, /specify input path/);
    });
  });
});
