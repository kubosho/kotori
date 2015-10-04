import objectAssign from "object-assign";
import defaultOptions from "./default-options";
import Config from "../config";
import Kotori from "../index";

/**
 * Create a new instance of the core CLI engine
 * @param {CLIEngineOptions} options - Kotori CLI options object (see: ./default-options.js)
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
    const kotori = new Kotori();
    const build = kotori.src(patterns[0])
                        .pipe(kotori.build(this.config));

    if (patterns.length > 2) {
      throw new Error("Specify paths of too many");
    } else if (patterns.length === 1) {
      return build.pipe(kotori.dest(process.cwd()));
    } else {
      return build.pipe(kotori.dest(patterns[1]));
    }
  }
}
