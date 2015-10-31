import chokidar from "chokidar";
import log from "./helper/log";

/**
 * File watch class
 * @param {String[]} files - watch target file paths
 */
export default class Watch {
  constructor(files) {
    this.files = files;
    this.watch = chokidar.watch(this.files, {
      ignored: /[\/\\]\./,
      ignoreInitial: true,
      persistent: true
    });
  }

  /**
   * Files watch to run callback, if add or change fire event
   * @param {Function} cb - callback function
   */
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
