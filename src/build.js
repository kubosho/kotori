import fs from "fs";
import through from "through2";
import autoprefixer from "autoprefixer";
import CleanCSS from "clean-css";
import { cssfmt } from "cssfmt";
import postcss from "postcss";
import reporter from "postcss-reporter";
import stylelint from "stylelint";
import Config from "./config";
import Stats from "./stats";

/**
 * Kotori build based on config
 * @param {Object} config - Kotori config (object or JSON)
 */
export default class Build {
  constructor(conf) {
    const config = new Config();

    this.config = config.parse(conf) || config.load();

    if (this.config.env !== void 0) {
      this.config.environment = this.config.env;
    }
  }

  /**
   * through2.obj() wrapper
   * @returns {Stream} Transform stream
   */
  transform() {
    return through.obj((file, encode, callback) => {
      this.transformCore(this.config, file, callback)
    });
  }

  /**
   * Operate on written data, then read the result of each file
   * @param {Object} config - Kotori config (object or JSON)
   * @param {File} file - chunk
   * @param {Function} callback - callback function
   * @private
   */
  transformCore(config, file, callback) {
    if (file.isNull()) {
      callback(null, file);
      return;
    }

    if (file.isStream()) {
      callback(Error("Stream is not supported"));
      return;
    }

    const postcssPlugins = activatePostCSSPlugins(config);
    const processor = postcss(postcssPlugins)
      .process(file.contents.toString(), {
        map : file.sourceMap ? {annotation: false} : false,
        from: file.path,
        to  : file.path
      });

    processor
      .then((res) => {
        let contents = res.css;

        if (/product(?:ion)?/.test(config.environment)) {
          const minified = new CleanCSS().minify(res.css);
          contents = minified.styles;
        }

        file.contents = new Buffer(contents);

        if (config.stats) {
          const stats = new Stats(file.path, config.stats);

          stats.parseCSS()
            .then((result) => {
              return stats.writeStats(result);
            })
            .then(() => {
              callback(null, file);
            })
            .catch((err) => {
              callback(err);
            });
        } else {
          callback(null, file);
        }
      })
      .catch((err) => {
        callback(err);
      });
  }
}

/**
 * Activating PostCSS plugins
 * @param {Object} config - Kotori config object
 * @returns {Function[]} PostCSS plugins list
 * @private
 */
function activatePostCSSPlugins(config) {
  const plugins = [];

  if (config.lintRules || config.lintRules !== "") {
    // TODO: Throw easy-to-understand error message
    // incorrect path? (ex. "lintRules": "aaa")
    // typo? (ex. "lintRules": "stylelint-config-suitcs")
    const lintRules = require(config.lintRules);

    if (lintRules.rules) {
      plugins.push(stylelint(lintRules));
    } else {
      throw new Error("Illegal lint rule: \"rules\" property is not found.");
    }
  }

  if (config.browsers && config.browsers !== "") {
    plugins.push(autoprefixer(config.browsers));
  }

  plugins.push(cssfmt);
  plugins.push(reporter);

  return plugins;
}
