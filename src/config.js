import fs from "fs";
import path from "path";
import userHome from "user-home";
import log from "./helper/log";

const KOTORI_CONFIG_DIR = path.resolve(__dirname, "../conf/");
const LOCAL_CONFIG_FILENAME = ".kotorirc";
const PERSONAL_CONFIG_PATH = userHome ? `${userHome}/${LOCAL_CONFIG_FILENAME}` : null;

export default class Config {
  constructor(filePath) {
    this.config = null;
    this.filePath = filePath;

    if (this.filePath === void 0) {
      this.filePath = `${process.cwd()}/${LOCAL_CONFIG_FILENAME}`;
    }
  }

  /**
   * Load project or user path Kotori config object
   * @returns {Object} Kotori config
 */
  load() {
    let configLoadErrors = [];

    try {
      this.config = loadConfigCore(this.filePath);
    } catch (err) {
      configLoadErrors.push(err.message);
    }

    if (this.config !== null) {
      try {
        this.config = loadConfigCore(PERSONAL_CONFIG_PATH);
      } catch (err) {
        configLoadErrors.push(err.message);
      }
    }

    if (this.config === null && configLoadErrors.length > 0) {
      const paths = `${PERSONAL_CONFIG_PATH} and ${path.resolve(process.cwd(), LOCAL_CONFIG_FILENAME)}`;

      this.config = loadConfigCore(`${KOTORI_CONFIG_DIR}/${LOCAL_CONFIG_FILENAME}`);
      log("info", `${paths} is not found, will use default config.`);
    }

    return parseConfigCore(this.config);
  }

  /**
   * Parse config
   * @param {Object} configItem - Config object
   * @returns {Object} Kotori config
   */
  parse(configItem) {
    return parseConfigCore(configItem);
  }
}

/**
 * Load config core function, from object or local config file
 * @param {Object|String} configItem - Config object or file path
 * @returns {Object} Kotori config
 * @private
 */
function loadConfigCore(configItem) {
  if (typeof configItem === "string") {
    configItem = fs.readFileSync(configItem, "utf8");
  } else if (typeof configItem === "object") {
    // do nothing
  } else {
    throw new Error("Unexpected config item type.");
  }

  return configItem;
}

/**
 * Parse config core function
 * @param {Object} configItem - Config object
 * @returns {Object} Kotori config
 * @private
 */
function parseConfigCore(configItem) {
  if (isObject(configItem) || isJSON(configItem)) {
    try {
      configItem = JSON.parse(configItem);
    } catch (err) {
      // configItem is Object.
      if (/^Unexpected token.*/.test(err.message)) {
        return configItem;
      }
    }

    return configItem;
  }
}

/**
 * If an item is an object, returns true. false if it is not
 * @param {Object} item - Any object
 * @returns {Boolean}
 * @private
 */
function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}

/**
 * If an item is an JSON, returns true. false if it is not
 * @param {JSON} item - Any JSON
 * @returns {Boolean}
 * @private
 */
function isJSON(item) {
  item = typeof item !== "string"
    ? JSON.stringify(item)
    : item;

  try {
    item = JSON.parse(item);
  } catch (err) {
    return false;
  }

  return (typeof item === "object" && item !== null);
}
