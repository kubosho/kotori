import CLIEngine from './cli-engine';
import Watch from '../watch';
import options from './options';
import pkg from '../../package.json';

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
    watch: cliOptions.watch,
  };
}

/**
 * Executes the CLI based on an array of arguments that is passed
 * @param {String[]} args - The arguments to process
 * @returns {Number} The exit code for the operation
 */
export default function (args) {
  let currentOptions;

  try {
    currentOptions = options.parse(args);
  } catch (error) {
    console.error(error.message);
    return 1;
  }

  const files = currentOptions._;

  if (currentOptions.version) {
    console.log(`v${pkg.version}`);
  } else if (currentOptions.help) {
    console.log(options.generateHelp());
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
