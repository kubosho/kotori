import fs from "fs";
import path from "path";
import StyleStats from "stylestats";
import Format from "stylestats/lib/format";

export default class Stats {
  constructor(file, statsConfig) {
    const stats = new StyleStats(file.path);

    stats.parse((err, result) => {
      if (err !== null) {
        throw new Error(`StyleStats error: ${err} in ${file.path}`);
      }

      const format = new Format(result);
      let method = "toTable";
      let extension = `.${statsConfig.outputFormat}`;

      switch (statsConfig.outputFormat) {
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
          format.setTemplate(fs.readFileSync(statsConfig.templateFile, {
            encoding: "utf8"
          }));
          extension = ".html";
          method = "parseTemplate";
          break;
        default:
          break;
      }

      format[method]((data) => {
        file.contents = new Buffer(data);
        file.path = `${path.basename(file.path, path.extname(file.path))}${extension}`;

        if (statsConfig.outputDir && statsConfig.outputDir !== "") {
          const outputDir = `${process.cwd()}/${statsConfig.outputDir}`

          fs.mkdirSync(outputDir);
          fs.writeFileSync(`${outputDir}/${file.path}`, file.contents);
        }
      });
    });
  }
}
