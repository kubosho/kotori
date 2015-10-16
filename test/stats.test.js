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

    before((done) => {
      fs.readFile(`${process.cwd()}/test/cases/stats-test-data.json`, (err, data) => {
        statsTestData = data;
        done();
      });
  });
});
