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

    if (patterns.length === 1) {
      return kotori.src(patterns[0])
        .pipe(kotori.build(this.config))
        .pipe(kotori.dest(process.cwd()));
    } else if (patterns.length <= 2) {
      return kotori.src(patterns[0])
        .pipe(kotori.build(this.config))
        .pipe(kotori.dest(patterns[1]));
    } else {
      console.error("specify paths of too many");
      return;
    }
  }
}
