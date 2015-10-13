"use strict";

import fs from "fs";
import File from "vinyl";
import stats from "../src/stats";

/** @test {stats} */
describe("stats", () => {
  it("output stats data (JSON format) in stats/", () => {
    const statsConfig = {
      stats: {
        outputFormat: "json",
        outputDir   : "stats"
      }
    };

    return stats(`${process.cwd()}/test/cases/main.css`, statsConfig.stats)
      .then((statsData) => {
        assert.notStrictEqual(statsData, null);
      })
      .catch((err) => {
        assert.strictEqual(err, null);
      });
  });
});
