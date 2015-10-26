import CLIEngine from "./cli-engine";
import Watch from "../watch";
import options from "./options";
import log from "../helper/log";
import pkg from "../../package.json";

export default {
  /**
   * Executes the CLI based on an array of arguments that is passed
   * @param {String[]} args - The arguments to process
   * @returns {Number} The exit code for the operation
   */
  execute: (args) => {
    let currentOptions;

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
    }

    if (currentOptions.version || currentOptions.help) {
      return 0;
    }

    const engine = new CLIEngine(translateOptions(currentOptions));

    if (currentOptions.watch) {
      const watch = new Watch(files);
      watch.watcher(engine.executeOnFiles.bind(engine));
    } else {
      engine.executeOnFiles(files);
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
    config: cliOptions.config,
    output: cliOptions.output,
    watch : cliOptions.watch
  };
}
