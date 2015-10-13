"use strict";

import fs from "fs";
import path from "path";
import File from "vinyl";

import build from "../src/build";

/** @test {Kotori#build} */
describe("Kotori#build", () => {
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
    const stream = build();

    stream.on("data", (file) => {
      assert.strictEqual(/-/.test(file.contents.toString()), true);
      assert.strictEqual(file.relative, path.join("test", "cases", "main.css"));
    });

    stream.on("end", done);

    stream.write(testCSSFile);

    stream.end();
  });
});
