/**
 * console.(log|info|error|warn) wrapper
 * @param {string} type - Console log type (see: https://nodejs.org/api/console.html)
 * @param {any} data - Prints to stdout (maybe stderr)
 * @private
 */
export default function(type, ...data) {
  if (process.env.NODE_ENV = "test") {
    return;
  }

  let log = Function.prototype.bind.call(console[type], console);
  log.apply(this, data);
}
