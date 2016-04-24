"use strict";

import assert from "power-assert";

import fs from "fs";
import File from "vinyl";
import Stats from "../src/stats";

/** @test {Stats} */
describe("Stats", () => {
  /** @test {Stats#parseCSS} */
  describe("Stats#parseCSS", () => {
    const statsConfig = {
      stats: {
        outputFormat: "json"
      }
    };
    const stats = new Stats(`${process.cwd()}/test/cases/main.css`, statsConfig.stats);

    it("outputs the stats data (JSON format) after CSS file parse", () => {
      return stats.parseCSS()
        .then((result) => {
          assert.notStrictEqual(result.published, void 0);
        })
        .catch((err) => {
          assert.strictEqual(err, null);
        });
    });
  });

  /** @test {Stats#writeStats} */
  describe("Stats#writeStats", () => {
    const statsConfig = {
      stats: {
        outputFormat: "html",
        outputDir   : "stats"
      }
    };
    const stats = new Stats(`${process.cwd()}/test/cases/main.css`, statsConfig.stats);
    let statsTestData = null;

    before((done) => {
      fs.readFile(`${process.cwd()}/test/cases/stats-test-data.json`, (err, data) => {
        statsTestData = data;
        done();
      });
    });

    it("output stats data (HTML format) in stats/", () => {
      return stats.writeStats(statsTestData)
        .then((result) => {
          assert.notStrictEqual(result, null);
        })
        .catch((err) => {
          assert.strictEqual(err, null);
        });
    });
  });
});
