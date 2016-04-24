"use strict";

import assert from "power-assert";

import fs from "fs";
import path from "path";
import File from "vinyl";

import Build from "../src/build";

/** @test {Build} */
describe("Build", () => {
  /** @test {Stats#transform} */
  describe("Build#transform", () => {
    const testCSSPath = `${process.cwd()}/test/cases/main.css`;
    let testCSSFile = null;

    before((done) => {
      fs.readFile(testCSSPath, (err, data) => {
        testCSSFile = new File({
          path: testCSSPath,
          contents: data
        });
        done();
      });
    });

    it("work properly", (done) => {
      const build = new Build();
      const stream = build.transform();

      stream.on("data", (file) => {
        assert.strictEqual(/-/.test(file.contents.toString()), true);
        assert.strictEqual(file.relative, path.join("test", "cases", "main.css"));
      });

      stream.on("end", done);

      stream.write(testCSSFile);
      stream.end();
    });

    it("config.lintRules is empty, not throw error (not import lint package)", (done) => {
      const conf = {
        "lintRules": ""
      };
      const build = new Build(conf);
      const stream = build.transform();

      stream.on("data", (file) => {
        assert.strictEqual(/-/.test(file.contents.toString()), true);
        assert.strictEqual(file.relative, path.join("test", "cases", "main.css"));
      });

      stream.on("end", done);

      stream.write(testCSSFile);
      stream.end();
    });
  });
});
