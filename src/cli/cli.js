import CLIEngine from "./cli-engine";
import defaultOptions from "./default-options";
import log from "../helper/log";
import options from "./options";
import pkg from "../../package.json";

export default {
  /**
   * Executes the CLI based on an array of arguments that is passed
   * @param {String[]} args - The arguments to process
   * @returns {Number} The exit code for the operation
   */
  execute: (args) => {
    let currentOptions;
    let stream;

    try {
      currentOptions = options.parse(args);
    } catch (error) {
      log("error", error.message);
      return 1;
    }

    const files = currentOptions._;

    if (currentOptions.version) {
      log("log", `v${pkg.version}`);
    } else if (currentOptions.help) {
      log("log", options.generateHelp());
    } else {
      const engine = new CLIEngine(translateOptions(currentOptions));
      stream = engine.executeOnFiles(files);
    }

    return 0;
  }
}

/**
 * Translates the CLI options into the options expected by the CLIEngine
 * @param {Object} cliOptions - The CLI options object (optionator format)
 * @returns {Object} The options object for the CLIEngine
 * @private
 */
function translateOptions(cliOptions) {
  return {
    config: cliOptions.config || defaultOptions.config,
    output: cliOptions.output || defaultOptions.output,
    watch : cliOptions.watch || defaultOptions.watch
  };
}
