import fs from "fs";
import through from "through2";
import autoprefixer from "autoprefixer";
import CleanCSS from "clean-css";
import cssfmt from "cssfmt";
import postcss from "postcss";
import reporter from "postcss-reporter";
import stylelint from "stylelint";
import Config from "./config";
import Stats from "./stats";
import log from "./helper/log";

let currentConfig;
const config = new Config();

/**
 * Kotori build based on config
 * @param {Object} conf - Kotori config (object or JSON)
 * @returns {Stream} Transform stream
 */
export default function(conf) {
  currentConfig = conf || config.getConfig();

  try {
    currentConfig = JSON.parse(currentConfig);
  } catch (err) {
    // do nothing
  }

  if (currentConfig.env !== void 0) {
    currentConfig.environment = currentConfig.env;
  }

  return through.obj(transform);
}

/**
 * Operate on written data, then read the result of each file
 * @param {File} file - chunk
 * @param {String} encode - file encode
 * @param {Function} callback - callback function
 * @private
 */
function transform(file, encode, callback) {
  if (file.isNull()) {
    callback(null, file);
    return;
  }

  if (file.isStream()) {
    callback(Error("Stream is not supported"));
    return;
  }

  const postcssPlugins = activatePostCSSPlugins(currentConfig);
  const processor = postcss(postcssPlugins)
    .process(file.contents.toString(), {
      map : file.sourceMap ? {annotation: false} : false,
      from: file.path,
      to  : file.path
    });

  processor
    .then((res) => {
      if (/product(?:ion)?/.test(currentConfig.environment)) {
        const cleanCSS = new CleanCSS();
        const minified = cleanCSS.minify(res.css);

        file.contents = new Buffer(minified.styles);
      }

      if (currentConfig.stats) {
        new Stats(file, currentConfig.stats);
      }

      setImmediate(callback, null, file);
    })
    .catch((err) => {
      setImmediate(callback, err);
    });
}

/**
 * Activating PostCSS plugins
 * @param {Object} config - Kotori config object
 * @returns {Function[]} PostCSS plugins list
 * @private
 */
function activatePostCSSPlugins(config) {
  const plugins = [];
  let lintRules = null;

  try {
    lintRules = require(config.lintRules);
  } catch (err) {
    throw err;
  }

  if (lintRules.rules) {
    plugins.push(stylelint(lintRules));
  } else {
    throw new Error("Illegal lint rule: \"rules\" property is not found.");
  }

  if (config.browsers && config.browsers !== "") {
    plugins.push(autoprefixer(config.browsers));
  }

  plugins.push(cssfmt);
  plugins.push(reporter);

  return plugins;
}
