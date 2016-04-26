"use strict";

import assert from "power-assert";

import cli from "../src/cli/cli";

/** @test {cli} */
describe("cli", () => {
  /** @test {cli.execute} */
  describe("options", () => {
    it("throw error of run `kotori` (empty)", () => {
      assert.strictEqual(cli(), 1);
    });

    it("throw error of run `kotori -z` (invalid option)", () => {
      assert.strictEqual(cli("-z"), 1);
    });

    it("no error of run `kotori -v`", () => {
      assert.strictEqual(cli("-v"), 0);
    });

    it("no error of run `kotori -h`", () => {
      assert.strictEqual(cli("-h"), 0);
    });
  });
});
