import fs from "fs";
import path from "path";
import moment from "moment";
import StyleStats from "stylestats";
import Format from "stylestats/lib/format";
import log from "./helper/log";

/**
 * Statistics of CSS file and stats data outputs
 * @param {String} statsTargetFilePath - Stats target CSS file path
 * @param {Object} statsConf - Stats config object (see: stats property in .kotorirc)
 */
export default class Stats {
  constructor(statsTargetFilePath, statsConf) {
    this.statsTargetFilePath = statsTargetFilePath;
    this.statsConf = statsConf;
  }

  /**
   * Parse CSS file
   * @returns {Promise}
   */
  parseCSS() {
    const stats = new StyleStats(this.statsTargetFilePath);

    return new Promise((resolve, reject) => {
      stats.parse((err, result) => {
        if (err !== null) {
          reject(new Error(`StyleStats parse error: ${err.message}`));
        }

        resolve(result);
      });
    });
  }

  /**
   * Write CSS statistics data to config.outputDir
   * @param {Object} statsData - CSS analyzing data (StyleStats format)
   * @returns {Promise}
   */
  writeStats(statsData) {
    const statsFileName = path.basename(this.statsTargetFilePath, path.extname(this.statsTargetFilePath));
    const statsOutputDir = `${process.cwd()}/${this.statsConf.outputDir}`;
    const format = new Format(statsData);
    const formatData = selectFormat(this.statsConf.outputFormat);

    return new Promise((resolve, reject) => {
      format[formatData.method]((result) => {
        const statsContents = new Buffer(result);

        if (!this.statsConf.outputDir || this.statsConf.outputDir === "") {
          log("log", result);
          resolve(result);
          return;
        }

        let statsPath = `${statsFileName}${formatData.extension}`;

        if (this.statsConf.timestamp) {
          const statsTimeStamp = moment().format("YYYYMMDDHHmmss");
          statsPath = `${statsFileName}.${statsTimeStamp}${formatData.extension}`;
        }

        try {
          fs.accessSync(statsOutputDir);
        } catch (err) {
          fs.mkdirSync(statsOutputDir);
        }

        try {
          fs.writeFileSync(`${statsOutputDir}/${statsPath}`, statsContents);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}

/**
 * Select CSS statistics data format
 * @param {String} format
 * @returns {{extension: String, method: String}}
 * @private
 */
function selectFormat(format) {
  let method = "toTable";
  let extension = `.${format}`;

  switch (format) {
    case "json":
      method = "toJSON";
      break;
    case "csv":
      method = "toCSV";
      break;
    case "html":
      method = "toHTML";
      break;
    case "md":
      method = "toMarkdown";
      break;
    default:
      break;
  }

  return {
    extension: extension,
    method: method
  }
}
