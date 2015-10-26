import path from "path";
import objectAssign from "object-assign";
import Config from "../config";
import Kotori from "../index";

const DEFAULT_OPTIONS = {
  config: "",
  output: null,
  watch : false
};

/**
 * Create a new instance of the core CLI engine
 * @param {Object} options - Kotori CLI options object (see: ./default-options.js)
 */
export default class CLIEngline {
  constructor(options) {
    this.currentOptions = objectAssign(DEFAULT_OPTIONS, options);
    this.config = new Config(this.currentOptions.config).getConfig();

    if (this.currentOptions.output === "" || this.currentOptions.output == null) {
      this.currentOptions.output = process.cwd();
    }
  }

  /**
   * Executes the current configuration on an array of file and directory names
   * @param {String[]} files - An array of file and directory names
   * @returns {Stream} Readable/Writable stream
   */
  executeOnFiles(files) {
    if (!Array.isArray(files)) {
      throw new Error("Must specify array as argument");
    }

    if (files.length > 1) {
      throw new Error("Input path of too many");
    } else if (files.length < 1) {
      throw new Error("Must specify input path");
    }

    const kotori = new Kotori();
    let src = files[0];

    if (path.extname(src) === "") {
      src = `${src}/*.css`;
    }

    return kotori.src(src)
      .pipe(kotori.build(this.config))
      .pipe(kotori.dest(this.currentOptions.output));
  }
}
