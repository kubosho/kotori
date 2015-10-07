import fs from "fs";
import configSuitCSS from "stylelint-config-suitcss";
import userHome from "user-home";
import log from "./helper/log";

const defaultConfig = {
  browsers   : ["last 2 version", "> 5%", "Firefox ESR"],
  environment: "production",
  lintRules  : configSuitCSS,
  stats      : {
    outputFormat: "json",
    outputDir   : "stats",
    templateFile: ""
  }
};

const LOCAL_CONFIG_FILENAME = ".kotorirc";
const PERSONAL_CONFIG_PATH = userHome ? `${userHome}/${LOCAL_CONFIG_FILENAME}` : null;

export default class Config {
  constructor(filePath) {
    let config = {};

    try {
      config = loadConfig(PERSONAL_CONFIG_PATH);
    } catch (err) {
      log("info", `${PERSONAL_CONFIG_PATH} is not found.`);
      config = loadConfig(defaultConfig);
    }

    if (filePath) {
      try {
        config = loadConfig(filePath);
      } catch (err) {
        log("info", `${filePath} is not found, will use default config.`);
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
 * If an object is an object, returns true. false if it is not
 * @param {Object} item - Any object
 * @returns {Boolean}
 * @private
 */
function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}
