/**
 * console.(log|info|error|warn) wrapper
 * @param {string} type - Console log type ("log"|"info"|"error"|"warn")
 * @param {any} data - Prints to stdout (if specify "error" or "warn" at type param, output stderr)
 * @private
 */
export default function(type, ...data) {
  if (process.env.NODE_ENV = "test") {
    return;
  }

  let log = Function.prototype.bind.call(console[type], console);
  log.apply(this, data);
}
