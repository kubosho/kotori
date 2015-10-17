import fs from "fs";
import vfs from "vinyl-fs";
import Build from "./build";

export default class Kotori {
  /**
   * vinyl-fs.src() wrapper
   * @param {String} globs - takes a glob string or an array of glob strings
   * @returns {Stream} Readable stream
   */
  src(globs) {
    return vfs.src(globs);
  }

  /**
   * Operate on written data, then read the result of each file
   * @param {Object} config - Kotori config object
   * @returns {Stream} Transform stream
   */
  build(config) {
    const build = new Build(config);
    return build.transform();
  }

  /**
   * vinyl-fs.dest() wrapper
   * @param {String} folder - takes a folder path
   * @returns {Stream} Readable/Writable stream
   */
  dest(folder) {
    return vfs.dest(folder);
  }
}
