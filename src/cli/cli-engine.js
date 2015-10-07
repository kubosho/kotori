import path from "path";
import objectAssign from "object-assign";
import Config from "../config";
import Kotori from "../index";

const defaultOptions = {
  config: "",
  output: process.cwd(),
  watch : false
};

/**
 * Create a new instance of the core CLI engine
 * @param {Object} options - Kotori CLI options object (see: ./default-options.js)
 */
export default class CLIEngline {
  constructor(options) {
    this.currentOptions = objectAssign(defaultOptions, options);
    this.config = new Config(this.currentOptions.config);
  }

  /**
   * Executes the current configuration on an array of file and directory names
   * @param {String[]} patterns - An array of file and directory names
   * @returns {Stream} Readable/Writable stream
   */
  executeOnFiles(patterns) {
    if (patterns.length > 1) {
      throw new Error("Specify input path of too many");
    } else if (patterns.length < 1) {
      throw new Error("Must be specify input path");
    }

    const kotori = new Kotori();
    let src = patterns[0];

    if (path.extname(src) === "") {
      src = `${src}/*.*`;
    }

    return kotori.src(src)
      .pipe(kotori.build(this.config))
      .pipe(kotori.dest(this.currentOptions.output));
  }
}
