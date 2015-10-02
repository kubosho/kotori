import objectAssign from "object-assign";
import defaultOptions from "./default-options";
import Config from "../config";
import Nozomi from "../index";

/**
 * Create a new instance of the core CLI engine
 * @param {CLIEngineOptions} options - Nozomi CLI options object (see: ./default-options.js)
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
    const nozomi = new Nozomi();

    if (patterns.length === 1) {
      return nozomi.src(patterns[0])
        .pipe(nozomi.build(this.config))
        .pipe(nozomi.dest(process.cwd()));
    } else if (patterns.length <= 2) {
      return nozomi.src(patterns[0])
        .pipe(nozomi.build(this.config))
        .pipe(nozomi.dest(patterns[1]));
    } else {
      console.error("specify paths of too many");
      return;
    }
  }
}
