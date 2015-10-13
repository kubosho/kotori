import fs from "fs";
import path from "path";
import moment from "moment";
import StyleStats from "stylestats";
import through from "through2";
import Format from "stylestats/lib/format";
import log from "./helper/log";

export default function(filePath, statsConf) {
  const stats = new StyleStats(filePath);

  return new Promise((resolve, reject) => {
    stats.parse((err, result) => {
      if (err !== null) {
        reject(new Error(`StyleStats error: ${err.message}`));
      }

      const data = statsConfigData(statsConf);

      writeStats(filePath, data, result, (err, statsData, statsPath) => {
        if (err !== null) {
          reject(err);
        }

        resolve(statsData, statsPath);
      });
    });
  });
}

function writeStats(inputFilePath, statsConfigData, statsParseData, callback) {
  const statsFileName = path.basename(inputFilePath, path.extname(inputFilePath));
  const statsOutputDir = `${process.cwd()}/${statsConfigData.conf.outputDir}`;
  const format = new Format(statsParseData);

  format[statsConfigData.method]((result) => {
    const statsContents = new Buffer(result);

    if (!statsConfigData.conf.outputDir || statsConfigData.conf.outputDir === "") {
      log("log", result);
      callback(null, result);
    } else {
      let statsPath = `${statsFileName}${statsConfigData.extension}`;

      if (statsConfigData.conf.timestamp) {
        const statsTimeStamp = moment().format("YYYYMMDDHHmmss");
        statsPath = `${statsFileName}.${statsTimeStamp}${statsConfigData.extension}`;
      }

      try {
        fs.accessSync(statsOutputDir);
      } catch (err) {
        fs.mkdirSync(statsOutputDir);
      }

      try {
        fs.writeFileSync(`${statsOutputDir}/${statsPath}`, statsContents);
        callback(null, result, statsPath);
      } catch (err) {
        callback(err);
      }
    }
  });
}

function statsConfigData(statsConf) {
  let method = "toTable";
  let extension = `.${statsConf.outputFormat}`;

  switch (statsConf.outputFormat) {
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
    case "template":
      format.setTemplate(fs.readFileSync(statsConf.templateFile, {
        encoding: "utf8"
      }));
      extension = ".html";
      method = "parseTemplate";
      break;
    default:
      break;
  }

  return {
    conf: statsConf,
    extension: extension,
    method: method
  };
}
