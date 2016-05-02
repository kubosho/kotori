/**
 * If an item is an object, returns true. false if it is not
 * @param {Object} item - Any object
 * @returns {Boolean}
 * @private
 */
export function isObject(item) {
  return typeof item === 'object' && !Array.isArray(item) && item !== null;
}

/**
 * If an item is an JSON, returns true. false if it is not
 * @param {JSON} item - Any JSON
 * @returns {Boolean}
 * @private
 */
export function isJSON(item) {
  item = typeof item !== 'string'
    ? JSON.stringify(item)
    : item;

  try {
    item = JSON.parse(item);
  } catch (err) {
    return false;
  }

  return (typeof item === 'object' && item !== null);
}
