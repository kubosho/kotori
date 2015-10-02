import fs from "fs";
import userHome from "user-home";
import defaultConfig from "./default-config";

export default class Config {
  constructor(filePath) {
    const LOCAL_CONFIG_FILENAME = ".nozomirc";
    const PERSONAL_CONFIG_PATH = userHome ? `${userHome}/${LOCAL_CONFIG_FILENAME}` : null;

    let config = {};

    try {
      config = loadConfig(PERSONAL_CONFIG_PATH);
    } catch (err) {
      console.info(`${PERSONAL_CONFIG_PATH} is not found.`);
      config = loadConfig(defaultConfig);
    }

    if (filePath) {
      try {
        config = loadConfig(filePath);
      } catch (err) {
        console.info(`${filePath} is not found, will use default config.`);
        config = loadConfig(defaultConfig);
      }
    }

    return config;
  }
}

function loadConfig(configItem) {
  let config = {};

  if (isObject(configItem)) {
    config = configItem;
  } else {
    config = readConfigFromFile(configItem);
  }

  return config;
}

function readConfigFromFile(filePath) {
  let config = {};

  try {
    config = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    err.message = `Cannot read config file: ${filePath}\nError: ${err.message}`;
    throw err;
  }

  return config;
}

/**
 * Operate on written data, then read the result of each file
 * @param item Nozomi config object (see: ./default-config.js)
 * @returns {Boolean} Transform stream
 * @private
 */
function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}
