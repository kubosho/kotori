"use strict";

import path from "path";
import File from "vinyl";

import build from "../src/build";

/** @test {Kotori#build} */
describe("Kotori#build", () => {
  const testCSSFile = new File({
    path: "test.css",
    contents: new Buffer("div {\n\tdisplay: flex;\n}")
  });

  it("work properly", (done) => {
    const stream = build();

    stream.on("data", (file) => {
      assert.strictEqual(/-/.test(file.contents.toString()), true);
      assert.strictEqual(file.relative, "test.css");
    });

    stream.on("end", done);

    stream.write(testCSSFile);

    stream.end();
  });
});
