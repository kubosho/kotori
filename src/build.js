import fs from "fs";
import through from "through2";
import objectAssign from "object-assign";
import autoprefixer from "autoprefixer";
import CleanCSS from "clean-css";
import cssfmt from "cssfmt";
import postcss from "postcss";
import reporter from "postcss-reporter";
import stylelint from "stylelint";
import StyleStats from "stylestats";
import defaultConfig from "./default-config";

let currentConfig;

/**
 * Operate on written data, then read the result of each file
 * @param {Object} config - Nozomi config object (see: ./default-config.js)
 * @returns {Stream} Transform stream
 */
export default function(config) {
  currentConfig = objectAssign(defaultConfig, config);

  if (currentConfig.env !== void 0) {
    currentConfig.environment = currentConfig.env;
  }

  return through.obj(transform);
}

/**
 * Operate on written data, then read the result of each file
 * @param {Buffer} file - chunk
 * @param {string} encode - file encode
 * @param {Function} callback - callback function
 * @private
 */
function transform(file, encode, callback) {
  if (file.isNull()) {
    callback(null, file);
    return;
  }

  if (file.isStream()) {
    callback(Error("Streaming not supported"));
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
        let stats = new StyleStats(file.path);

        stats.parse((err, result) => {
          console.log(JSON.stringify(result, null, 2));
        });
      }

      setImmediate(callback, null, file);
    })
    .catch((err) => {
      setImmediate(callback, err);
    });
}

/**
 * Activating PostCSS plugins
 * @param {Object} config - Nozomi config object (see: ./default-config.js)
 * @returns {Function[]} PostCSS plugins list
 * @private
 */
function activatePostCSSPlugins(config) {
  const plugins = [];

  if (config.lintRules && config.lintRules.rules) {
    plugins.push(stylelint(config.lintRules));
  }

  if (config.browsers && config.browsers !== "") {
    plugins.push(autoprefixer(config.browsers));
  }

  plugins.push(cssfmt);
  plugins.push(reporter);

  return plugins;
}
