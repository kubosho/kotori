import chokidar from "chokidar";
import log from "./helper/log";

export default class Watch {
  constructor(files) {
    this.files = files;
    this.watch = chokidar.watch(this.files, {
      ignored: /[\/\\]\./,
      ignoreInitial: true,
      persistent: true
    });
  }

  watcher(cb) {
    this.watch
      .on("all", (eventType, path) => {
        if (eventType === "add" || eventType === "change") {
          log("info", `${eventType}: ${path}`);

          try {
            cb([path]);
          } catch (err) {
            console.error(err.stack);
          }
        }
      });
  }
}
