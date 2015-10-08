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
    this.configLoadError = [];

    try {
      this.config = loadConfig(PERSONAL_CONFIG_PATH);
    } catch (err) {
      this.configLoadError.push(err.message);
    }

    try {
      this.config = loadConfig(filePath);
    } catch (err) {
      this.configLoadError.push(err.message);
    }

    if (this.configLoadError.length === 1) {
      this.configLoadError = [];
    }
  }

  /**
   * Build the Kotori config object
   * @returns {Object} Kotori config
 */
  getConfig() {
    if (this.config === null && this.configLoadError.length > 0) {
      const paths = `${PERSONAL_CONFIG_PATH} and ${path.resolve(__dirname, LOCAL_CONFIG_FILENAME)}`;

      this.config = loadConfig(`${KOTORI_CONFIG_DIR}/${LOCAL_CONFIG_FILENAME}`);
      log("info", `${paths} is not found, will use default config.`);
    }

    return this.config;
  }
}

/**
 * Load config from object or local config file
 * @param {Object|String} configItem - Config object or file path
 * @returns {Object} Kotori config
 * @private
 */
function loadConfig(configItem) {
  let config = {};

  if (isObject(configItem)) {
    config = configItem;
  } else if (typeof configItem === "string") {
    config = readConfigFromFile(configItem);
  } else {
    throw new Error("Unexpected config item type.");
  }

  return config;
}

/**
 * Read the Kotori config file from local
 * @param {String} filePath - Config file path (JSON or Object format)
 * @returns {Object} Kotori config
 * @private
 */
function readConfigFromFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    throw err;
  }
}

/**
 * If an object is an object, returns true. false if it is not
 * @param {Object} item - Any object
 * @returns {Boolean}
 * @private
 */
function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}
