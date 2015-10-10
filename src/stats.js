import fs from "fs";
import path from "path";
import moment from "moment";
import StyleStats from "stylestats";
import Format from "stylestats/lib/format";

export default class Stats {
  constructor(filePath, statsConf) {
    const stats = new StyleStats(filePath);

    stats.parse((err, result) => {
      if (err !== null) {
        throw new Error(`StyleStats error: ${err} in ${filePath}`);
      }

      const format = new Format(result);
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

      format[method]((data) => {
        const statsContents = new Buffer(data);
        const statsFileName = path.basename(filePath, path.extname(filePath));
        const statsTimeStamp = moment().format("YYYYMMDDHHmmss");
        const statsPath = `${statsFileName}.${statsTimeStamp}${extension}`;

        if (statsConf.outputDir && statsConf.outputDir !== "") {
          const outputDir = `${process.cwd()}/${statsConf.outputDir}`;

          try {
            fs.accessSync(outputDir);
          } catch (err) {
            fs.mkdirSync(outputDir);
          }

          fs.writeFileSync(`${outputDir}/${statsPath}`, statsContents);
        }
      });
    });
  }
}
